import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldWeaponView = '"id", "weapon_name", "weapon_code", "weapon_type_id", "weapon_type_name", "rack_id", "rack_name", "condition_type", "acquisition_type_id", "acquisition_type", "ownership_type_id", "ownership_type", "status_id", "status_type", "employee_id", "employee_name", "equipment_pick_date", "equipment_condition", "expected_maintenance_date", "input_date", "weapon_image", "weapon_image_2", "weapon_image_3", "document", "description", "created_date", "modified_date", "is_active"'

const weaponResolverQuery = {
  create_weapon: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'weapon', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldWeaponView} from v_weapon where id = ${id}`)
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
      const { rows } = await client.query(`select ${fieldWeaponView} from v_weapon where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default weaponResolverQuery
