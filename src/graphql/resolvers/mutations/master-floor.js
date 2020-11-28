import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldFloorView = '"id", "floor_name", "building_name", "description", "is_active", "created_by", "created_date", "modified_by", "modified_date"'


const masterFloorResolverQuery = {
  create_master_floor: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_floor', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldFloorView} from v_master_floor where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_floor: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_floor', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldFloorView} from v_master_floor where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterFloorResolverQuery
