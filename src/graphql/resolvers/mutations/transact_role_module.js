import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'

const fieldRoleModule = '"id", "role_id", "role_name", "module_id", "module_name", "can_view", "can_create", "can_edit", "can_delete", "is_active"'

const transactRoleModuleMutation = {
  create_transact_role_module: async (_parent, { data }, { pubSub }) => {
    const query = mutationGenerator('INSERT', 'transact_role_modules', data)
    const client = await pool.connect()
    try {
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${fieldRoleModule} from v_transact_role_module where id = ${id}`)
      client.release()
      if(rows[0]) {
        const subscriptionData = {
          mutation:'CREATED',
          data:rows[0]
        }
        pubSub.publish('transact_role_module_subcription', { subcribe_transact_role_module: subscriptionData })
      }
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  update_transact_role_module: async (_parent, { data, id }, { pubSub }) => {
    const query = mutationGenerator('UPDATE', 'transact_role_modules', data, id)
    const client = await pool.connect()
    try {
      await client.query(query)
      const { rows } = await client.query(`select ${fieldRoleModule} from v_transact_role_module where id = ${id}`)
      client.release()
      if(rows[0]) {
        const subscriptionData = {
          mutation:'UPDATED',
          data:rows[0]
        }
        pubSub.publish('transact_role_module_subcription', { subcribe_transact_role_module: subscriptionData })
      }
      return rows[0]
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  remove_transact_role_module_by_role_id: async (_parent, { id }, { pubSub }) => {
    const query = 'update transact_role_modules set is_active = false where role_id = ' + id
    const client = await pool.connect()
    try {
      const { rows } = await client.query(query)
      client.release()
      if(rows[0]) {
        const subscriptionData = {
          mutation:'DELETED',
          data:rows[0]
        }
        pubSub.publish('transact_role_module_subcription', { subcribe_transact_role_module: subscriptionData })
      }
    } catch (e) {
      client.release()
      throw new Error(e)
    }
  },
  
}
export default transactRoleModuleMutation
