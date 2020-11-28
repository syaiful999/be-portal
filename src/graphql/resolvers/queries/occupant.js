//import moment from 'moment'
import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldOccupantView = '"id", "name", "nik","room_id","room_category_id", "room_category_name", "position", "arrived_date", "departed_date", "room_no", "created_by", "created_date", "modified_by", "modified_date", "image", "phone_no", "rank_id", "email", "address","employee_id","act_departed_date","is_late_checkout","reason", "user_photo_1","user_photo_2","gender","room_name"'

const occupantResolverQuery = {
  occupants: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldOccupantView} from v_occupant `
    let countQuery = 'select count(id) as total from v_occupant '
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
  occupant_distinct_name: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select distinct on ("name") ${fieldOccupantView} from v_occupant `
    let countQuery = 'select count(distinct "name") as total from v_occupant '
    if(filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if(must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true and "departed_date" is NULL'
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
  occupant_with_smartlock: async (_parent, { skip, take, filter, sort }) => {
    const field = '"id", "name", "nik", "room_name", "room_code", "room_no", "lock_id", "lock_alias"'
    let query = `select distinct on ("name") ${field} from v_occupant_with_smartlock `
    if(filter) {
      query += whereGenerator.filter({ ...filter })
    }
    if(sort) query += whereGenerator.sort({ ...sort })
    query += whereGenerator.limit(skip, take)
    const client = await pool.connect()
    try { 
      const { rows } = await client.query(query)
      client.release()
      return rows
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default occupantResolverQuery