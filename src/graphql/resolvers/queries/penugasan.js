import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldUserView = '"id", "ketua_tim_id", "ketua_tim_nama", "no_sprindik", "tanggal_mulai", "is_active", "bko", "subjek", "perihal", "satker", "created_by", "created_date", "modified_by", "modified_date", "penandatangan_id", "penandatangan_name", "penandatangan_rank", "penandatangan_level", "penandatangan_no"'
const fieldTransactTersangka = '"id", "id_penugasan", "nama_tersangka", "agama", "alamat", "tempat_lahir", "tanggal_lahir", "pekerjaan", "kewarganegaraan", "jenis_kelamin"'
const fieldTransactPersonil = '"id", "id_penugasan", "id_personil", "nama_personil", "rank", "level", "nomor_personil"'

const masterUserResolverQuery = {
  master_penugasan: async (_parent, { skip, take, filter, sort, must_active = true }) => {
    let query = `select ${fieldUserView} from v_master_penugasan `
    let countQuery = 'select count(id) as total from v_master_penugasan '
    if (filter) {
      query += whereGenerator.filter({ ...filter })
      countQuery += whereGenerator.filter({ ...filter })
    }
    if (must_active) {
      const isActiveQueryString = (filter ? '' : 'where 1=1 ') + ' and "is_active" = true'
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
  transact_personil: async (_parent, { id, must_active = false }) => {
    let query = `select ${fieldTransactPersonil} from v_transact_penugasan_personil `
    let countQuery = 'select count(id) as total from v_transact_penugasan_personil '
    const client = await pool.connect()
    if (id) {
      query += 'where "id_penugasan" = ' + id
      countQuery += 'where "id_penugasan" = ' + id
    }
    if (must_active) {
      const isActiveQueryString = (id ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
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
  transact_tersangka: async (_parent, { id, must_active = false }) => {
    let query = `select ${fieldTransactTersangka} from transact_penugasan_tersangka `
    let countQuery = 'select count(id) as total from transact_penugasan_tersangka '
    const client = await pool.connect()
    if (id) {
      query += 'where "id_penugasan" = ' + id
      countQuery += 'where "id_penugasan" = ' + id
    }
    if (must_active) {
      const isActiveQueryString = (id ? '' : 'where 1=1 ') + ' and "is_active" = true'
      query += isActiveQueryString
      countQuery += isActiveQueryString
    }
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
  total_personil_terlibat: async () => {
    let countQuery = 'select count(id_personil) from transact_penugasan_personil group by id_personil'
    const client = await pool.connect()
    try {
      const countReturnQuery = await client.query(countQuery)
      const { rows } = countReturnQuery
      client.release()
      return { total: rows.length }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  total_tersangka_terlibat: async () => {
    let countQuery = 'select count(id) from transact_penugasan_tersangka group by id'
    const client = await pool.connect()
    try {
      const countReturnQuery = await client.query(countQuery)
      const { rows } = countReturnQuery
      client.release()
      return { total: rows.length }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default masterUserResolverQuery