import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldRole = '"id", "role_name", "is_active", "created_date", "description", "modified_date"'

const masterRoleMutation = {
  create_master_role: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_role', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldRole} from master_role where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_role: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_role', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldRole} from master_role where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterRoleMutation
