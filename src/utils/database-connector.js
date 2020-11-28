import { POSTGRES, MONGODB, DB_CHAT } from '../config/config.json'
import { Pool } from 'pg'
import { connect } from 'mongoose'

const {
  HOST,
  PORT,
  DB_NAME,
  USERNAME,
  PASSWORD
} = POSTGRES

export const pool = new Pool({
  host:HOST,
  database:DB_NAME,
  port:PORT,
  user:USERNAME,
  password:PASSWORD
})