import { whereGenerator } from '../../../utils/where-generator-query'
import { pool } from '../../../utils/database-connector'

const fieldTransactPersonil = '"id", "id_penugasan", "id_personil", "nama_personil", "rank", "level", "nomor_personil", "no_sprindik","tanggal_mulai"'

const transactPersonil = {
  transact_personil_penugasan: async (
    _parent,
    { skip, take, filter, sort, must_active = true }
  ) => {
    let query = `select ${fieldTransactPersonil} from v_transact_penugasan_personil `
    let countQuery = 'select count(id) as total from v_transact_penugasan_personil '
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
export default transactPersonil