import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { GRAPHQL } from '../../../config/config.json'

const cmsUserResolverQuery = {
  loginCms: async (_parent, { username, password }) => {
    const query = `select * from v_cms_user where "username" = '${username}' limit 1;`
    try {
      const client = await pool.connect()
      const { rows } = await client.query(query)
      if (rows.length === 0) {
        return {
          authenticated: false,
          token: null,
          user_data: null
        }
      }
      const [userData] = rows
      client.release()
      const isSamePassword = bcrypt.compareSync(password, userData.password)
      if (isSamePassword) {
        const dataToken = {
          user_account: userData.id,
          role_id:userData.role_id,
          // field_user_type_id: userData.field_user_type_id,
          // user_type: userData.user_type,
          // user_account:userData.user_account,
          username: userData.fullnamae,
          password: userData.password,
          user_photo_1: userData.user_photo,
          // user_photo_2: userData.user_photo_2
        }
        const token = jwt.sign(dataToken, GRAPHQL.API_TOKEN_SECRET_KEY)
        return {
          authenticated: true,
          token,
          user_data: userData
        }
      }
      return {
        authenticated: false,
        token: null,
        user_data: null
      }
    } catch (e) {
      throw new Error(e)
    }
  },
  cms_users: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select * from v_cms_user `
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
