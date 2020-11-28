import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "field_username", "is_active", "created_date"'

const masterRankAndStructureResolverQuery = {
  master_field_user_types: async (_parent, { skip, take, filter, sort }) => {
    let query = `select ${fieldUserView} from master_field_user_type `
    let countQuery = 'select count(id) as total from master_field_user_type '
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
export default masterRankAndStructureResolverQuery