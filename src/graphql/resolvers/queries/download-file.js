'use strict'
import fs from 'fs'
import { ATTACHMENT } from '../../../config/config.json'

const masterRankAndStructureResolverQuery = {
  download_files: async (_parent, { files }) => {
    try {
      let dataReturn = []
      for (let i = 0; i < files.length; i++) {
        const item = files[i]
        const path = ATTACHMENT.UPLOAD_PATH + item.name
        if (fs.existsSync(path)) {
          const content = fs.readFileSync(path, { encoding: 'base64' })
          dataReturn.push({ file: content })
        }
      }
      return dataReturn
    } catch (e) {
      throw new Error(e)
    }
  },
}
export default masterRankAndStructureResolverQuery
