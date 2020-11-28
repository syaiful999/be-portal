import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldWeapon = '"id","weapon_name", "weapon_type_id", "weapon_type_name", "weapon_image","weapon_code","weapon_image_2","weapon_image_3","created_date","rack_id", "modified_date","created_by","modified_by", "is_active","rack_name","amount_1","status","usage_period","equipment_pick_date","equipment_return_date","equipment_condition","rack_description","employee_id","employee","weapon_id"'
const fieldWeaponTransact = '"id","weapon_code","weapon_name","employee_id","created_date","equipment_pick_date","equipment_return_date","equipment_condition","rack_description","weapon_id"'

const weaponResolverQuery = {
  create_weapon: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'weapon', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldWeapon} from v_weapon where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_weapon: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'weapon', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldWeapon} from v_weapon where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  create_weapon_transact: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'weapon_transact', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldWeaponTransact} from v_weapon_transact where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default weaponResolverQuery
