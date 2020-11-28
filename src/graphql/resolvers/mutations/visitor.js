import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldVisitorView = '"id", "name", "nik", "dob", "phone_no", "email", "address", "intended_person" , "relation", "purpose", "arrived_date", "departed_date","is_active", "created_by", "created_date", "modified_by", "modified_date","user_photo_1","user_photo_2","reason"'

const masterVisitorResolverQuery = {
  create_master_visitor: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_visitor', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldVisitorView} from v_master_visitor where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_visitor: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_visitor', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldVisitorView} from v_master_visitor where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterVisitorResolverQuery
