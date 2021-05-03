import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const newsCategory = {
  create_news_category: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'cms_news_category', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select * from cms_news_category where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default newsCategory
