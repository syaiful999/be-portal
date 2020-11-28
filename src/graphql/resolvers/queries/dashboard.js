import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldUserView =
  '"total", "bulan", "tahun","description"'

const masterDashboardResolverQuery = {
  dashboard: async (
    _parent,
    { skip, take, filter }
  ) => {
    let query = `select ${fieldUserView} from v_dashboard_visitor where tahun =  '${filter}'`
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      client.release()
      return { data: rows }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default masterDashboardResolverQuery
