import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldHouseKeepingDetail =
  '"room_no", "name", "room_condition","status"'

const reportHouseKeepingResolverQuery = {
  reporthousekeeping: async (
    _parent,
    { skip, take, filter, sort, must_active = true }
  ) => {
    let query = `select ${fieldHouseKeepingDetail} from v_report_housekeeping_detail `
    if (filter) {
      query += whereGenerator.filter({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString =
          (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
    }
    if (sort) query += whereGenerator.sort({ ...sort })
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
export default reportHouseKeepingResolverQuery