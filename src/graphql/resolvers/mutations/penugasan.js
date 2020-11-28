import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldPenugasanView = '"id", "ketua_tim_id", "no_sprindik", "tanggal_mulai", "bko", "subjek", "perihal", "satker", "is_active", "created_by", "created_date", "modified_by", "modified_date"'
const fieldTransactTersangka = '"id", "id_penugasan", "nama_tersangka", "agama", "alamat", "tempat_lahir", "tanggal_lahir", "pekerjaan", "kewarganegaraan", "jenis_kelamin", "is_active"'
const fieldTransactPersonil = '"id", "id_penugasan", "id_personil", "nama_personil", "is_active"'

const masterPenugasanResolverQuery = {
  create_master_penugasan: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_penugasan', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldPenugasanView} from master_penugasan where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_penugasan: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_penugasan', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldPenugasanView} from master_penugasan where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  create_transact_personil: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'transact_penugasan_personil', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldTransactPersonil} from transact_penugasan_personil where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },

  create_transact_tersangka: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'transact_penugasan_tersangka', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldTransactTersangka} from transact_penugasan_tersangka where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  delete_transact_tersangka: async (_parent, { data }) => {
    const client = await pool.connect()
    try {
      await client.query('DELETE FROM transact_penugasan_tersangka WHERE "id_penugasan" = ' + data.id_penugasan)
      const { rows } = await client.query(`select ${fieldTransactTersangka} from transact_penugasan_tersangka`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  delete_transact_personil: async (_parent, { data }) => {
    const client = await pool.connect()
    try {
      await client.query('DELETE FROM transact_penugasan_personil WHERE "id_penugasan" = ' + data.id_penugasan)
      const { rows } = await client.query(`select ${fieldTransactPersonil} from transact_penugasan_personil`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  remove_transact_tersangka: async (_parent, { id }) => {
    const query = 'UPDATE transact_penugasan_tersangka SET is_active = false where id_penugasan = ' + id
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldTransactTersangka} from transact_penugasan_tersangka where id_penugasan = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  remove_transact_personil: async (_parent, { id }) => {
    const query = 'UPDATE transact_penugasan_personil SET is_active = false where id_penugasan = ' + id
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldTransactPersonil} from transact_penugasan_personil where id_penugasan = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default masterPenugasanResolverQuery
