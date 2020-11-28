import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "rank", "level", "description", "is_active", "created_by", "created_date", "modified_by", "modified_date"'


const masterRankResolverQuery = {
  create_master_rank: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_rank_and_structure', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldUserView} from v_master_rank_and_structure where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_rank: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_rank_and_structure', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldUserView} from v_master_rank_and_structure where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterRankResolverQuery
