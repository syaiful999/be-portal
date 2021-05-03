import bcrypt from 'bcryptjs'

import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const cmsUserResolverQuery = {
  create_cms_user: async (_parent, { data }) => {
    const dataAfterHash = { ...data, real_password:data.password, password: bcrypt.hashSync(data.password, 10) }
    const query = mutationGenerator('INSERT', 'cms_user', dataAfterHash)
    const client = await pool.connect()
    try {
        const mutationReturn = await client.query(query)
        const [{ id }] = mutationReturn.rows
        const { rows } = await client.query(`select * from v_cms_user where id = ${id}`)
        client.release()
        return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_cms_user: async (_parent, { data, id }) => {
    const dataAfterHash = { ...data, real_password:data.password, password: bcrypt.hashSync(data.password, 10) }
    const query = mutationGenerator('UPDATE', 'cms_user', dataAfterHash, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select * from v_cms_user where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default cmsUserResolverQuery
