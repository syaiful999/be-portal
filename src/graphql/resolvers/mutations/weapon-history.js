import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldWeaponView = '"id", "weapon_name", "weapon_code", "weapon_type_id", "weapon_type_name", "rack_id", "rack_name", "acquisition_type_id", "acquisition_type", "status_id", "status_type", "employee_id", "employee_name", "equipment_pick_date", "equipment_condition", "expected_maintenance_date", "input_date", "weapon_image", "weapon_image_2", "weapon_image_3", "description", "created_date", "modified_date", "is_active"'

const weaponResolverQuery = {
  create_weapon_history: async (_parent, { data }) => {
    const query = mutationGenerator('INSERT', 'weapon_history', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldWeaponView} from v_weapon_history where id = ${id}`)
      client.release()
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
}
export default weaponResolverQuery
