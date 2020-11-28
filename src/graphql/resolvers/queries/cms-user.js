import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldView =
  '"user_id", "field_user_id", "username", "password", "user_account", "fullname", "role_id", "role_name", "user_type_id", "email", "profile_photo", "post_count", "is_active"'

const cmsUserResolverQuery = {
  v_cms_users: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldView} from v_cms_user `
    let countQuery = 'select count(user_id) as total from v_cms_user '
    if (filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString =
        (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    if (sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const countReturnQuery = await client.query(countQuery)
      const [{ total }] = countReturnQuery.rows
      client.release()
      return { total, data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default cmsUserResolverQuery
