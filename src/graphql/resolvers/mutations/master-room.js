import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "room_no", "room_name", "room_code", "room_image", "room_image_2", "room_image_3", "config_room_status", "room_status", "config_room_condition", "room_condition", "floor_id", "floor_name", "room_category_id", "room_category_name", "is_active", "created_by","created_date", "modified_by", "modified_date"'


const masterToolResolverQuery = {
  create_master_room: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_room', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldUserView} from v_master_room where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_room: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_room', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldUserView} from v_master_room where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterToolResolverQuery
