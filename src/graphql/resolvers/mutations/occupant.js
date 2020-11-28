


import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldOccupantView = '"id", "name", "nik","room_id","room_category_name", "position", "arrived_date", "departed_date", "room_no", "created_by", "created_date", "modified_by", "modified_date", "image", "phone_no", "rank_id", "email", "address","employee_id","act_departed_date","is_late_checkout","reason", "user_photo_1","user_photo_2"'

const masterOccupantResolverQuery = {
  create_occupant: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'occupant', data)
    //console.log(query)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      //console.log(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldOccupantView} from v_occupant where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      //console.log(query)
      client.release()
      throw new Error(e)
    }
  },
  update_occupant: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'occupant', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldOccupantView} from v_occupant where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}

export default masterOccupantResolverQuery
