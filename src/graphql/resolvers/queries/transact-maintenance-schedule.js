import moment from 'moment'
import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'
import { timeParser } from '../../../utils/time-parser'

const fieldUserView =
  '"id", "assigned_employee_id", "assigned_employee_name", "maintenance_start_date", "maintenance_start_time", "maintenance_end_date", "maintenance_end_time", "master_building_id", "master_building_name", "master_building_code", "description", "tools_required", "config_maintenance_schedule_status_code", "config_maintenance_schedule_status_desc", "is_active", "created_by", "created_date", "modified_by", "modified_date"'
const fieldToolsRequired =
  '"id", "master_tools_id", "tools_name", "transact_maintenance_schedule_id", "is_active", "created_by", "created_date", "modified_by", "modified_date"'
const transactMaintenanceScheduleResolverQuery = {
  transact_maintenance_schedules: async (
    _parent,
    { skip, take, filter, sort, must_active = true }
  ) => {
    let query = `select ${fieldUserView} from v_transact_maintenance_schedule `
    let countQuery =
      'select count(id) as total from v_transact_maintenance_schedule '
    if (filter) {
      query += filterGenerator({ ...filter })
      countQuery += filterGenerator({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString =
        (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if (sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      const data = rows.map((item) => ({
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
      return { total, data }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  transact_maintenance_schedule_required_tools: async (
    _parent,
    { skip, take, filter, sort, must_active = true }
  ) => {
    let query = `select ${fieldToolsRequired} from v_transact_maintenance_schedule_tools_required `
    let countQuery =
      'select count(id) as total from v_transact_maintenance_schedule_tools_required '
    if (filter) {
      query += filterGenerator({ ...filter })
      countQuery += filterGenerator({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString =
        (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if (sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      const data = rows
      client.release()
      return { total, data }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  total_assigned_transact_maintenance_schedules: async (
    _parent,
    { filter, must_active = true }
  ) => {
    let query =
      'select count(distinct assigned_employee_id) total from v_transact_maintenance_schedule tms '
    if (filter) {
      query += filterGenerator({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString =
        (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
    }
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const [{ total }] = rows
      client.release()
      return { total, data: { total } }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default transactMaintenanceScheduleResolverQuery
const filterGenerator = ({ logic, filters }) => {
  let where = 'where 1=1 and ('
  filters.forEach((item, index) => {
    switch (item.type) {
      case 'string': {
        where += stringGenerator(item)
        break
      }
      case 'numeric': {
        where += numericGenerator(item)
        break
      }
      case 'date': {
        where += dateTimeGenerator(item)
        break
      }
      case 'time': {
        where += timeGenerator(item)
        break
      }
      case 'boolean': {
        where += booleanGenerator(item)
        break
      }
    }
    if (index + 1 < filters.length) {
      where += `${logic} `
    } else {
      where += ')'
    }
  })
  return where
}
const stringGenerator = (item) => {
  let val = ''
  switch (item.operator) {
    case 'contains': {
      val += `"${item.field}" like '%${item.value}%' `
      break
    }
    case 'not_contains': {
      val += `"${item.field}" not like '%${item.value}%' `
      break
    }
    case 'start_with': {
      val += `"${item.field}" like '%${item.value}' `
      break
    }
    case 'end_with': {
      val += `"${item.field}" like '${item.value}%' `
      break
    }
    default: {
      val += `"${item.field}" = '${item.value}' `
      break
    }
  }
  return val
}
const numericGenerator = (item) => {
  let val = ''
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" = ${item.value} `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> ${item.value} `
      break
    }
    case 'gt': {
      val += `"${item.field}" > ${item.value} `
      break
    }
    case 'gte': {
      val += `"${item.field}" >= ${item.value} `
      break
    }
    case 'lt': {
      val += `"${item.field}" < ${item.value} `
      break
    }
    case 'lte': {
      val += `"${item.field}" <= ${item.value} `
      break
    }
    default: {
      val += `"${item.field}" = ${item.value} `
      break
    }
  }
  return val
}
const booleanGenerator = (item) => {
  let val = ''
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" = ${item.value} `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> ${item.value} `
      break
    }
    default: {
      val += `"${item.field}" = ${item.value} `
      break
    }
  }
  return val
}
const dateTimeGenerator = (item) => {
  let val = ''
  const value = moment(new Date(item.value)).format('YYYY-MM-DD HH:mm:ss')
  const startDate = moment(new Date(item.value))
    .startOf('day')
    .format('YYYY-MM-DD HH:mm:ss')
  const endDate = moment(new Date(item.value))
    .endOf('day')
    .format('YYYY-MM-DD HH:mm:ss')
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" >= '${startDate}' and "${item.field}" <= '${endDate}' `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> '${value}' `
      break
    }
    case 'gt': {
      val += `"${item.field}" > '${value}' `
      break
    }
    case 'gte': {
      val += `"${item.field}" >= '${value}' `
      break
    }
    case 'lt': {
      val += `"${item.field}" < '${value}' `
      break
    }
    case 'lte': {
      val += `"${item.field}" <= '${value}' `
      break
    }
    default: {
      val += `"${item.field}" = '${value}' `
      break
    }
  }
  return val
}
const timeGenerator = (item) => {
  const value = moment(new Date(item.value)).format('HH:mm:00')
  return `"${item.field}" = '${value}' `
}
