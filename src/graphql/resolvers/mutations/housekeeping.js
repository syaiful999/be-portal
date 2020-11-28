


import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldHouskeepingView = '"id", "name", "nik","room_id", "room_category_name", "position", "start_date", "end_date","start_time","end_time", "room_no", "created_by", "created_date", "modified_by", "modified_date", "phone_no", "rank_id", "email", "address","employee_id","status_id","status","description", "user_photo_1","user_photo_2","is_active","room_name","room_code","status_code"'

const masterHousekeepingResolverQuery = {
  create_housekeeping: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'housekeeping', data)
    //console.log(query)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      //console.log(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldHouskeepingView} from v_housekeeping where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      //console.log(query)
      client.release()
      throw new Error(e)
    }
  },
  update_housekeeping: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'housekeeping', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldHouskeepingView} from v_housekeeping where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}

export default masterHousekeepingResolverQuery
