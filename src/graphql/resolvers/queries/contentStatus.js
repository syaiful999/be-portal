import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const contentStatusQuery = {
  content_status: async (_parent, { skip, take, filter, sort}) => {
    let query = `select * from cms_config_news_status  `
    let countQuery = 'select count(id) as total from cms_config_news_status '
    if(filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if(sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try { 
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data:rows }
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default contentStatusQuery