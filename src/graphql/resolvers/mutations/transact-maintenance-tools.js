import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "tool_code", "master_tool_id", "tools_type", "tool_name", "is_active", "created_by", "created_date", "modified_by", "modified_date"'

const transactMaintenanceToolsResolver = {
  create_transact_maintenance_tool: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'transact_maintenance_tool', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldUserView} from v_transact_maintenance_tool where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }

  },
  update_transact_maintenance_tool: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'transact_maintenance_tool', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldUserView} from v_transact_maintenance_tool where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default transactMaintenanceToolsResolver
