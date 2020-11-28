import http from 'https'
import moment from 'moment'
import qs from 'querystring'
import axios from 'axios'

import { SMARTLOCK_SCIENER } from '../config/config.json'
const {
  CLIENT_ID,
  ACCESS_TOKEN,
  API,
  LIST_PASSCODE,
  ADD_PASSCODE,
  CHANGE_PASSCODE,
  DELETE_PASSCODE,
  LIST_CARD,
  ADD_CARD,
  CHANGE_VALIDITY_CARD,
  DELETE_CARD
} = SMARTLOCK_SCIENER

const getListPasscode = async ({ lockId, startDate, endDate }) => {
  const options = {
    method: 'POST',
    hostname: API,
    port: null,
    path: LIST_PASSCODE,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
  }
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      const chunks = []

      res.on('data', (chunk) => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        const body = Buffer.concat(chunks)
        const strBody = body.toString()
        const json = JSON.parse(strBody)
        resolve(json)
      })
    })
    req.write(qs.stringify({
      clientid:CLIENT_ID,
      accessToken:ACCESS_TOKEN,
      lockId,
      keyboardPwdVersion:'4',
      keyboardPwdType:'2',
      keyboardPwdName:'',
      startDate:unixDateTimeParser('milisecond', startDate),
      endDate:unixDateTimeParser('milisecond', endDate),
      date:unixDateTimeParser('milisecond', new Date())
    }))
    
    req.end()
  })
}
const addPassCode = async ({
  lockId,
  passcode,
  passcodeName,
  startDate,
  endDate
}) => {
  const q = qs.stringify({
    clientId: CLIENT_ID,
    accessToken: ACCESS_TOKEN,
    lockId,
    keyboardPwd: passcode,
    keyboardPwdName: passcodeName,
    startDate:unixDateTimeParser('milisecond', startDate),
    endDate:unixDateTimeParser('milisecond', endDate),
    addType:'2',
    date:unixDateTimeParser('milisecond', new Date())
  })
  try {
    const { data } = await axios.post(ADD_PASSCODE + '?' + q, {}, {
      headers:{ 'content-type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch(e) {
    console.log(e)
    return { errcode:'500', errmsg:e.toString() }
  }
}
const changePasscode = async ({
  lockId,
  passcodeID,
  newPasscode,
  startDate,
  endDate
}) => {
  const q = qs.stringify({
    clientId:CLIENT_ID,
    accessToken:ACCESS_TOKEN,
    lockId,
    keyboardPwdId:passcodeID,
    newKeyboardPwd:newPasscode,
    startDate:unixDateTimeParser('milisecond', startDate),
    endDate:unixDateTimeParser('milisecond', endDate),
    changeType:'2',
    date:unixDateTimeParser('milisecond', new Date())
  })
  try {
    const { data } = await axios.post(CHANGE_PASSCODE + '?' + q, {}, {
      headers:{ 'content-type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch(e) {
    console.log(e)
    return { errcode:'500', errmsg:e.toString() }
  }
}
const deletePasscode = async ({ lockId, passcodeID }) => {
  const q = qs.stringify({
    clientId:CLIENT_ID,
    accessToken:ACCESS_TOKEN,
    lockId,
    keyboardPwdId:passcodeID,
    deleteType:'2',
    date:unixDateTimeParser('milisecond', new Date())
  })
  try {
    const { data } = await axios.post(DELETE_PASSCODE + '?' + q, {}, {
      headers:{ 'content-type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch(e) {
    console.log(e)
    return { errcode:'500', errmsg:e.toString() }
  }
}
const getListICCard = async ({ lockId }) => {
  const options = {
    method: 'POST',
    hostname: API,
    port: null,
    path: LIST_CARD,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
  }
  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      const chunks = []

      res.on('data', (chunk) => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        const body = Buffer.concat(chunks)
        const strBody = body.toString()
        const json = JSON.parse(strBody)
        resolve(json)
      })
    })
    req.write(qs.stringify({
      clientid:CLIENT_ID,
      accessToken:ACCESS_TOKEN,
      lockId,
      pageNo:'1',
      pageSize:'100',
      date:unixDateTimeParser('milisecond', new Date())
    }))
    req.end()
  })
}
const addICCard = async ({
  lockId,
  cardNumber,
  cardName,
  startDate,
  endDate
}) => {
  const q = qs.stringify({
    clientId:CLIENT_ID,
    accessToken:ACCESS_TOKEN,
    lockId,
    cardNumber,
    cardName,
    startDate:unixDateTimeParser('milisecond', startDate),
    endDate:unixDateTimeParser('milisecond', endDate),
    addType:'2',
    date:unixDateTimeParser('milisecond', new Date())
  })
  try {
    const { data } = await axios.post(ADD_CARD + '?' + q, {}, {
      headers:{ 'content-type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch(e) {
    console.log(e)
    return { errcode:'500', errmsg:e.toString() }
  }
}
const cahangeValidityCard = async ({
  lockId,
  cardId,
  startDate,
  endDate
}) => {
  const q = qs.stringify({
    clientId:CLIENT_ID,
    accessToken:ACCESS_TOKEN,
    lockId,
    cardId,
    startDate:unixDateTimeParser('milisecond', startDate),
    endDate:unixDateTimeParser('milisecond', endDate),
    changeType:'2',
    date:unixDateTimeParser('milisecond', new Date())
  })
  try {
    const { data } = await axios.post(CHANGE_VALIDITY_CARD + '?' + q, {}, {
      headers:{ 'content-type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch(e) {
    console.log(e)
    return { errcode:'500', errmsg:e.toString() }
  }
}
const deleteCard = async ({ lockId, cardId }) => {
  const q = qs.stringify({
    clientId:CLIENT_ID,
    accessToken:ACCESS_TOKEN,
    lockId,
    cardId,
    deleteType:'2',
    date:unixDateTimeParser('milisecond', new Date())
  })
  try {
    const { data } = await axios.post(DELETE_CARD + '?' + q, {}, {
      headers:{ 'content-type': 'application/x-www-form-urlencoded' }
    })
    return data
  } catch(e) {
    console.log(e)
    return { errcode:'500', errmsg:e.toString() }
  }
}
const unixDateTimeParser = (timeType, date) => {
  switch(timeType) {
    case 'second':
      return parseInt(parseInt(moment(date).format('x')) / 1000).toString()
    case 'milisecond':
      return parseInt(parseInt(moment(date).format('x'))).toString()
    default:
      return ''
  }
}
export const smartlockConnector = {
  getListPasscode,
  addPassCode,
  changePasscode,
  deletePasscode,
  getListICCard,
  addICCard,
  cahangeValidityCard,
  deleteCard
}