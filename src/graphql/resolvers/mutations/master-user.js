import bcrypt from 'bcryptjs'

import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "field_user_type_id", "user_type", "role_id", "role_name", "user_account", "name", "username", "password", "user_photo_1", "user_photo_2", "rank_id", "rank", "level", "dob", "email", "phone_no", "address", "is_active", "created_by", "created_date", "modified_by", "modified_date"'

const masterUserResolverQuery = {
  create_master_system_user: async (_parent, { data }) => {
    const dataAfterHash = { ...data, password:bcrypt.hashSync(data.password, 10) }
    const query = mutationGenerator('INSERT', 'master_system_user', dataAfterHash)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldUserView} from v_master_system_user where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }

  },
  update_master_system_user: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_system_user', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldUserView} from v_master_system_user where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterUserResolverQuery
