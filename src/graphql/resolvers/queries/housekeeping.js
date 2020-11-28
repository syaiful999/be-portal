import moment from 'moment'
import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'
import { timeParser } from '../../../utils/time-parser'

const fieldHouskeepingView = '"id", "name", "nik","room_id", "room_category_name", "position", "start_date", "end_date","start_time","end_time", "room_no", "created_by", "created_date", "modified_by", "modified_date", "phone_no", "rank_id", "email", "address","employee_id","status_id","status","description", "user_photo_1","user_photo_2","is_active","room_name","room_code","status_code"'


const housekeepingResolverQuery = {
  housekeepings: async (
    _parent,
    { skip, take, filter, sort, must_active = true }
  ) => {
    let query = `select ${fieldHouskeepingView} from v_housekeeping `
    let countQuery =
        'select count(id) as total from v_housekeeping '
    if (filter) {
      query += filterGenerator({ ...filter })
      countQuery += filterGenerator({ ...filter })
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
      const data = rows.map((item) => ({
        ...item,
        start_date: moment(
          new Date(item.start_date)
        ).format('DD-MM-YYYY'),
        start_time: timeParser(item.start_time),
        end_date:
            item.end_date === null
              ? null
              : moment(new Date(item.end_date)).format('DD-MM-YYYY'),
        end_time:
            item.end_time === null
              ? null
              : timeParser(item.end_time),
      }))
      client.release()
      return { total, data }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  total_assign_housekeeping: async (
    _parent,
    { filter, must_active = true }
  ) => {
    let query =
      'select count(distinct employee_id) total from v_housekeeping v '
    if (filter) {
      query += filterGenerator({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString =
        (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
    }
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      const [{ total }] = rows
      client.release()
      return { total, data: { total } }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default housekeepingResolverQuery

const filterGenerator = ({ logic, filters }) => {
  let where = 'where 1=1 and ('
  filters.forEach((item, index) => {
    switch (item.type) {
      case 'string': {
        where += stringGenerator(item)
        break
      }
      case 'numeric': {
        where += numericGenerator(item)
        break
      }
      case 'date': {
        where += dateTimeGenerator(item)
        break
      }
      case 'time': {
        where += timeGenerator(item)
        break
      }
      case 'boolean': {
        where += booleanGenerator(item)
        break
      }
    }
    if (index + 1 < filters.length) {
      where += `${logic} `
    } else {
      where += ')'
    }
  })
  return where
}

const stringGenerator = (item) => {
  let val = ''
  switch (item.operator) {
    case 'contains': {
      val += `"${item.field}" like '%${item.value}%' `
      break
    }
    case 'not_contains': {
      val += `"${item.field}" not like '%${item.value}%' `
      break
    }
    case 'start_with': {
      val += `"${item.field}" like '%${item.value}' `
      break
    }
    case 'end_with': {
      val += `"${item.field}" like '${item.value}%' `
      break
    }
    default: {
      val += `"${item.field}" = '${item.value}' `
      break
    }
  }
  return val
}
const numericGenerator = (item) => {
  let val = ''
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" = ${item.value} `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> ${item.value} `
      break
    }
    case 'gt': {
      val += `"${item.field}" > ${item.value} `
      break
    }
    case 'gte': {
      val += `"${item.field}" >= ${item.value} `
      break
    }
    case 'lt': {
      val += `"${item.field}" < ${item.value} `
      break
    }
    case 'lte': {
      val += `"${item.field}" <= ${item.value} `
      break
    }
    default: {
      val += `"${item.field}" = ${item.value} `
      break
    }
  }
  return val
}
const booleanGenerator = (item) => {
  let val = ''
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" = ${item.value} `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> ${item.value} `
      break
    }
    default: {
      val += `"${item.field}" = ${item.value} `
      break
    }
  }
  return val
}
const dateTimeGenerator = (item) => {
  let val = ''
  const value = moment(new Date(item.value)).format('YYYY-MM-DD HH:mm:ss')
  const startDate = moment(new Date(item.value))
    .startOf('day')
    .format('YYYY-MM-DD HH:mm:ss')
  const endDate = moment(new Date(item.value))
    .endOf('day')
    .format('YYYY-MM-DD HH:mm:ss')
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" >= '${startDate}' and "${item.field}" <= '${endDate}' `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> '${value}' `
      break
    }
    case 'gt': {
      val += `"${item.field}" > '${value}' `
      break
    }
    case 'gte': {
      val += `"${item.field}" >= '${value}' `
      break
    }
    case 'lt': {
      val += `"${item.field}" < '${value}' `
      break
    }
    case 'lte': {
      val += `"${item.field}" <= '${value}' `
      break
    }
    default: {
      val += `"${item.field}" = '${value}' `
      break
    }
  }
  return val
}
const timeGenerator = (item) => {
  const value = moment(new Date(item.value)).format('HH:mm:00')
  return `"${item.field}" = '${value}' `
}
