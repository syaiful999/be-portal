import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldMasterRackView = '"id", "inventory_room_id", "rack_no", "row_no", "rack_name", "floor_id", "floor_name", "room_id", "is_active", "created_by", "created_date", "modified_by", "modified_date", "description"'

const masterRackResolverQuery = {
  create_master_rack: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_rack', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldMasterRackView} from v_master_rack where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_rack: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_rack', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldMasterRackView} from v_master_rack where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterRackResolverQuery
