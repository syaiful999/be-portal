import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'


const fieldInventoryView = '"id", "name","rack_name","barcode", "description", "type_name", "is_active", "created_by", "created_date", "modified_by", "modified_date","join_duration"'

const masterInventoryResolverQuery = {
  create_master_inventory: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'master_inventory', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldInventoryView} from v_master_inventory where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_master_inventory: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'master_inventory', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldInventoryView} from v_master_inventory where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default masterInventoryResolverQuery
