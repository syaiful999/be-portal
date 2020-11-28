import mutationGenerator from '../../../utils/mutation-generator'
import { pool } from '../../../utils/database-connector'
import { smartlockConnector } from '../../../utils/smartlock-connector'

const smartlockPasscodeView = '"id", "master_smartlock_id", "occupant_id", "employee_id", "employee_name", "employee_nik", "passcode", "master_smartlock_alias", "room_id", "room_no", "room_code", "room_name", "is_active", "valid_start_date", "valid_end_date", "created_by", "created_date", "modified_by", "modified_date"'
const smartlockICCardView = '"id", "master_smartlock_id", "occupant_id", "employee_id", "employee_name", "employee_nik", "card_no", "master_smartlock_alias", "room_id", "room_no", "room_code", "room_name", "is_active", "valid_start_date", "valid_end_date", "created_by", "created_date", "modified_by", "modified_date"'


const smartlockResolverQuery = {
  create_smartlock_passcode: async (_parent, { data }) => {
    const client = await pool.connect()
    try {
      const lockId = data.master_smartlock_id
      const passcode = data.passcode
      const passcodeName = 'occupant_id_' + data.occupant_id
      const startDate = data.valid_start_date
      const endDate = data.valid_end_date
      const scienerResponse = await smartlockConnector.addPassCode({ lockId, passcode, passcodeName, startDate, endDate })
      if(scienerResponse.errcode) {
        throw new Error(scienerResponse.errmsg)
      }
      const sciener_passcode_id = scienerResponse.keyboardPwdId
      const newData = { ...data, sciener_passcode_id }
      const query = mutationGenerator('INSERT', 'transact_smartlock_passcode', newData)
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${smartlockPasscodeView} from v_transact_smartlock_passcode where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_smartlock_passcode: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'transact_smartlock_passcode', data, id)
    const client = await pool.connect()
    try {
      const lockId = data.master_smartlock_id
      const newPasscode = data.passcode
      const passcodeID = data.sciener_passcode_id
      const startDate = data.valid_start_date
      const endDate = data.valid_end_date
      console.log('first')
      const scienerResponse = await smartlockConnector.changePasscode({ lockId, passcodeID, newPasscode, startDate, endDate })
      if(scienerResponse.errcode) {
        throw new Error(scienerResponse.errmsg)
      }
      await client.query(query)
      const { rows } = await client.query(`select ${smartlockPasscodeView} from v_transact_smartlock_passcode where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  delete_smartlock_passcode: async (_parent, { id, sciener_passcode_id, master_smartlock_id }) => {
    const query = mutationGenerator('UPDATE', 'transact_smartlock_passcode', { is_active:false }, id)
    const client = await pool.connect()
    try {
      const lockId = master_smartlock_id
      const passcodeID = sciener_passcode_id
      const scienerResponse = await smartlockConnector.deletePasscode({ lockId, passcodeID })
      if(scienerResponse.errcode) {
        throw new Error(scienerResponse.errmsg)
      }
      await client.query(query)
      const { rows } = await client.query(`select ${smartlockPasscodeView} from v_transact_smartlock_passcode where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },

  create_smartlock_ic_card: async (_parent, { data }) => {
    const client = await pool.connect()
    try {
      const lockId = data.master_smartlock_id
      const cardNumber = parseInt(data.card_no, 16)
      const cardName = 'occupant_id_' + data.occupant_id
      const startDate = data.valid_start_date
      const endDate = data.valid_end_date
      const scienerResponse = await smartlockConnector.addICCard({ lockId, cardNumber, cardName, startDate, endDate })
      if(scienerResponse.errcode) {
        throw new Error(scienerResponse.errmsg)
      }
      const sciener_card_id = scienerResponse.cardId
      const newData = { ...data, sciener_card_id }
      const query = mutationGenerator('INSERT', 'transact_smartlock_ic_card', newData)
      const mutationReturn = await client.query(query)
      const [{ id }] = mutationReturn.rows
      const { rows } = await client.query(`select ${smartlockICCardView} from v_transact_smartlock_ic_card where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  update_smartlock_ic_card: async (_parent, { data, id }) => {
    const query = mutationGenerator('UPDATE', 'transact_smartlock_ic_card', data, id)
    const client = await pool.connect()
    try {
      const lockId = data.master_smartlock_id
      const cardId = data.sciener_card_id
      const startDate = data.valid_start_date
      const endDate = data.valid_end_date
      const scienerResponse = await smartlockConnector.cahangeValidityCard({ lockId, cardId, startDate, endDate })
      if(scienerResponse.errcode) {
        throw new Error(scienerResponse.errmsg)
      }
      await client.query(query)
      const { rows } = await client.query(`select ${smartlockICCardView} from v_transact_smartlock_ic_card where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  },
  delete_smartlock_ic_card: async (_parent, { id, sciener_card_id, master_smartlock_id }) => {
    const query = mutationGenerator('UPDATE', 'transact_smartlock_ic_card', { is_active:false }, id)
    const client = await pool.connect()
    try {
      const lockId = master_smartlock_id
      const cardId = sciener_card_id
      const scienerResponse = await smartlockConnector.deleteCard({ lockId, cardId })
      if(scienerResponse.errcode) {
        throw new Error(scienerResponse.errmsg)
      }
      await client.query(query)
      const { rows } = await client.query(`select ${smartlockICCardView} from v_transact_smartlock_ic_card where id = ${id}`)
      client.release()
      return rows[0]
    } catch(e) {
      client.release()
      throw new Error(e)
    }
  }
}
export default smartlockResolverQuery
