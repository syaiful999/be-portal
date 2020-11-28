import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "field_user_type_id", "user_type", "employee_no", "name", "rank_id", "rank", "level", "dob", "email", "phone_no", "address", "user_photo_1", "user_photo_2", "join_duration", "is_active", "created_by", "created_date", "modified_by", "modified_date"'

const portalRegisterQuery = {
  get_user_by_nik: async (_parent, { nik }) => {
    let query = `select ${fieldUserView} from v_master_field_user where 1=1 `
    let countQuery = 'select count(id) as total from v_master_field_user where 1=1 '
    if (nik) {
      const isActiveQueryString = ' and "employee_no" = ' + nik + '::text '
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
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
export default portalRegisterQuery