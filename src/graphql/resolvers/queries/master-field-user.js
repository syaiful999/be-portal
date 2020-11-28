import moment from 'moment'
import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "field_user_type_id", "user_type", "employee_no", "name", "rank_id", "rank", "level", "dob", "email", "phone_no", "address", "user_photo_1", "user_photo_2", "join_duration", "is_active", "created_by", "created_date", "modified_by", "modified_date","gender","status"'

const sum = arr => {
  let val = 0
  for(let i = 0; i < arr.length; i++) {
    val += arr[i]
  }
  return val
}

const masterUserResolverQuery = {
  master_field_users: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldUserView} from v_master_field_user `
    let countQuery = 'select count(id) as total from v_master_field_user '
    if(filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if(must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
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
  },
  master_employee_users: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldUserView} from v_master_field_user `
    let countQuery = 'select count(id) as total from v_master_field_user '
    if(filter) {
      const filterQueryString = whereGenerator.filter({ ...filter })
      query += filterQueryString
      countQuery += filterQueryString
    }
    if(must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
    const mustEmployee = ((filter || must_active) ? '' : 'where 1=1 ') +  ' and "field_user_type_id" = 1'
    query += mustEmployee
    countQuery += mustEmployee 
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
  },
  average_master_employee_user: async () => {
    const query = `select 
    concat(date_part('year', vmfu.created_date), '-', date_part('month', vmfu.created_date)) as date_join,
    date_part('year', vmfu.created_date) as year_join,
    date_part('month', vmfu.created_date) as month_join,
    count(concat(date_part('year', vmfu.created_date), '-',  date_part('month', vmfu.created_date))) as total
    from v_master_field_user vmfu where field_user_type_id = 1
    group by concat(date_part('year', vmfu.created_date), '-',  date_part('month', vmfu.created_date)),
    date_part('year', vmfu.created_date),
    date_part('month', vmfu.created_date)
    order by concat(date_part('year', vmfu.created_date), '-',  date_part('month', vmfu.created_date)) asc;`
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      let month_join = 1
      let year_join = 0
      if(rows.length > 0) [{ month_join, year_join }] = rows
      const totalAllData = sum(rows.map(e => parseInt(e.total)))
      const divider = parseInt(moment().format('MM')) - month_join + 1 + 
        (12*(parseInt(moment().format('YYYY')) - year_join))
      client.release()
      if(totalAllData === 0) return { average:0 }
      return {
        average:Math.round(totalAllData/divider)
      }
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterUserResolverQuery