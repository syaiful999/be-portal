import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView =
  '"id", "name", "building_code", "latitude", "longitude", "is_active", "created_by", "created_date", "modified_by", "modified_date", "location", "description"'


const masterBuildingResolverQuery = {
  create_master_building: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_building', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldUserView} from v_master_building where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_building: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_building', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldUserView} from v_master_building where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterBuildingResolverQuery
