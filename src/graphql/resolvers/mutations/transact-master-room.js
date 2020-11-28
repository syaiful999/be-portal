import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "gender", "master_room_id"'

const transactMasterRoomResolver = {
  create_transact_master_room: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'transact_master_room', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldUserView} from v_transact_master_room where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }

  },
  update_transact_master_room: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'transact_master_room', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldUserView} from v_transact_master_room where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default transactMasterRoomResolver
