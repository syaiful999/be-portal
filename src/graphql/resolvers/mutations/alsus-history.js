import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldAlsusView = '"id", "alsus_name","condition_type_id", "condition_type", "ownership_type_id", "ownership_type", "alsus_code", "alsus_type_id", "alsus_type_name", "rack_id", "rack_name", "acquisition_type_id", "acquisition_type", "status_id", "status_type", "employee_id", "employee_name", "equipment_pick_date", "equipment_condition", "expected_maintenance_date", "input_date", "alsus_image", "alsus_image_2", "alsus_image_3", "description", "created_date", "modified_date", "is_active"'

const alsusResolverQuery = {
  create_alsus_history: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'alsus_history', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldAlsusView} from v_alsus_history where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default alsusResolverQuery
