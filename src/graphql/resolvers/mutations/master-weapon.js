import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "type","description", "is_active", "created_by", "created_date", "modified_by", "modified_date"'


const masterToolResolverQuery = {
  create_master_weapon: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_weapon', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldUserView} from v_master_weapon where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_weapon: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_weapon', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldUserView} from v_master_weapon where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterToolResolverQuery
