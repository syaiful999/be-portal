import moment from 'moment'
import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'
import { timeParser } from '../../../utils/time-parser'

const fieldToolsRequired =
  '"id", "master_tools_id", "tools_name", "transact_maintenance_schedule_id", "is_active", "created_by", "created_date", "modified_by", "modified_date"'
const transactMaintenanceScheduleResolver = {
  create_transact_maintenance_schedule: async (_parent, { data }) => {
    const query = mutationGenerator(
      'INSERT',
      'transact_maintenance_schedule',
      data
    )
    const client = await pool.connect()
    try {
      const queryReturn = await client.query(
        `select count(id) from transact_maintenance_schedule tms where tms."assigned_employee_id" = ${data.assigned_employee_id} and (tms."config_maintenance_schedule_status" = 'NEW' or tms."config_maintenance_schedule_status" = 'ON_PROGRESS') and tms.is_active = true`
      )
      const [{ count }] = queryReturn.rows
      if (count > 0) {
        throw new Error('Assigned Employee has an unfinished schedule')
      }
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(
        `${queryForMaintenanceSchedule} where tms.id = ${id}`
      )
      const d = rows.map((item) => ({
        ...item,
        maintenance_start_date: moment(
          new Date(item.maintenance_start_date)
        ).format('DD-MM-YYYY'),
        maintenance_start_time: timeParser(item.maintenance_start_time),
        maintenance_end_date:
          item.maintenance_end_date === null
            ? null
            : moment(new Date(item.maintenance_end_date)).format('DD-MM-YYYY'),
        maintenance_end_time:
          item.maintenance_end_time === null
            ? null
            : timeParser(item.maintenance_end_time),
      }))
      client.release()
      return d[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_transact_maintenance_schedule: async (_parent, { data, id }) => {
    const query = mutationGenerator(
      'UPDATE',
      'transact_maintenance_schedule',
      data,
      id
    )
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(
        `${queryForMaintenanceSchedule} where tms.id = ${id}`
      )
      client.release()
      const d = rows.map((item) => ({
        ...item,
        maintenance_start_date: moment(
          new Date(item.maintenance_start_date)
        ).format('DD-MM-YYYY'),
        maintenance_start_time: timeParser(item.maintenance_start_time),
        maintenance_end_date:
          item.maintenance_end_date === null
            ? null
            : moment(new Date(item.maintenance_end_date)).format('DD-MM-YYYY'),
        maintenance_end_time:
          item.maintenance_end_time === null
            ? null
            : timeParser(item.maintenance_end_time),
      }))
      return d[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  create_transact_maintenance_schedule_tools_required: async (
    _parent,
    { data }
  ) => {
    const query = mutationGenerator(
      'INSERT',
      'transact_maintenance_schedule_tools_required',
      data
    )
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(
        `select ${fieldToolsRequired} from v_transact_maintenance_schedule_tools_required where id = ${id}`
      )
      const [data] = rows
      client.release()
      return data
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_transact_maintenance_schedule_tools_required: async (
    _parent,
    { data, id }
  ) => {
    const query = mutationGenerator(
      'UPDATE',
      'transact_maintenance_schedule_tools_required',
      data,
      id
    )
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(
        `select ${fieldToolsRequired} from v_transact_maintenance_schedule_tools_required where id = ${id}`
      )
      client.release()
      const [data] = rows
      return data
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default transactMaintenanceScheduleResolver

const queryForMaintenanceSchedule = `SELECT tms.id,
tms.assigned_employee_id,
mfu.name AS assigned_employee_name,
tms.maintenance_start_date,
tms.maintenance_start_time,
tms.maintenance_end_date,
tms.maintenance_end_time,
tms.master_building_id,
mb.name AS master_building_name,
tms.description,
tms.config_maintenance_schedule_status AS config_maintenance_schedule_status_code,
cmss.description AS config_maintenance_schedule_status_desc,
NULL AS tools_required,
tms.is_active,
cr_by.name AS created_by,
tms.created_date,
md_by.name AS modified_by,
tms.modified_date
FROM transact_maintenance_schedule tms
 JOIN master_field_user mfu ON mfu.id = tms.assigned_employee_id
 JOIN master_building mb ON mb.id = tms.master_building_id
 JOIN config_maintenance_schedule_status cmss ON cmss.maintenance_schedule_code::text = tms.config_maintenance_schedule_status::text
 JOIN master_system_user cr_by ON cr_by.id = tms.created_by
 JOIN master_system_user md_by ON md_by.id = tms.modified_by`
