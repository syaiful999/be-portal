import bcrypt from 'bcryptjs'

import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "username", "password", "fullname","email", "is_active", "created_by", "created_date", "modified_by", "modified_date"'

const portalUserResolverQuery = {
  create_portal_register: async (_parent, { data }) => {
    const dataAfterHash = { ...data, password: bcrypt.hashSync(data.password, 10) }
    const query = mutationGenerator('INSERT', 'portal_user', dataAfterHash)
    const client = await pool.connect()
    try {
      const isExistUsername = await client.query('SELECT * FROM portal_user where username = \'' + data.username + '\'')
      if (isExistUsername.rows.length > 0 ) {
        throw new Error('NRP atau Username telah terpakai')
      } else {
        const mutationReturn = await client.query(query)
        const [{ id }] = mutationReturn.rows
        const { rows } = await client.query(`select ${fieldUserView} from portal_user where id = ${id}`)
        client.release()
        return rows[0]
      }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  // update_master_system_user: async (_parent, { data, id }) => {
  //   const query = mutationGenerator('UPDATE', 'master_system_user', data, id)
  //   const client = await pool.connect()
  //   try {
  //     await client.query(query)
  //     const { rows } = await client.query(`select * from v_master_system_user where id = ${id}`)
  //     client.release()
  //     return rows[0]
  //   } catch(e) {
  //     client.release()
  //     throw new Error(e)
  //   }
  // }
}
export default portalUserResolverQuery
