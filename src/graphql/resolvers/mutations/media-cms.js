import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldMediaCms = '"id", "media_type","size","photo_name","is_active","photo", "created_by", "created_date"'

const masterRoleMutation = {
  create_media_cms: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'media_cms', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldMediaCms} from v_media_cms where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_media_cms: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'media_cms', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldMediaCms} from v_media_cms where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterRoleMutation
