import { GRAPHQL } from '../config/config.json'
import jwt from 'jsonwebtoken'

export const tokenDecoder = data => {
  return jwt.verify(data, GRAPHQL.API_TOKEN_SECRET_KEY, (_, decoded) => decoded)
}