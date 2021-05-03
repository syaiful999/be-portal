import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const videoStreaming = {
  create_video_streaming: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'cms_video_streaming', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select * from v_cms_video_streaming where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_video_streaming: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'cms_video_streaming', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select * from v_cms_video_streaming where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default videoStreaming
