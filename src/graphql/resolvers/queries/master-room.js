import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "room_no", "room_name", "room_code", "room_image", "room_image_2", "room_image_3", "config_room_status", "room_status", "config_room_condition", "room_condition", "floor_id", "floor_name", "room_category_id", "room_category_name", "is_active", "created_by","created_date", "modified_by", "modified_date","gender","transact_id"'

const masterRoomCategoryResolverQuery = {
  master_rooms: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldUserView} from v_master_room `
    let countQuery = 'select count(id) as total from v_master_room '
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
  report_master_room_occupancies: async () => {
    const query = `
      select  
        occ.id,
        mr.room_no,
        mrc."name" as room_category,
        mfu."name" as occupant_name,
        crs.status_name as room_status,
        occ.arrived_date,
        occ.departed_date 
      from occupant occ 
      join master_room mr on mr.id = occ.room_id 
      join master_room_category mrc on mrc.id = mr.room_category_id
      join master_field_user mfu on mfu.id = occ.employee_id 
      join config_room_status crs on crs.status_code = mr.config_room_status 
      order by occ.arrived_date desc;
  `
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      return rows
    } catch(e) {
      client.release()
      throw new Error(e)

    }
  }
}
export default masterRoomCategoryResolverQuery