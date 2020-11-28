import fs from 'fs'
import moment from 'moment'
import { ATTACHMENT } from '../../../config/config.json'

const uniqNameGenerator = () => Math.random().toString(36).substr(2, 9) + '-' + moment().format('X')

const uploadFileResolverMutation = {
  upload_files: async (_parent, { files }) => {
    try {
      let dataReturn = []
      const path = ATTACHMENT.UPLOAD_PATH
      const [primaryFile, secondaryFile, thirdFile] = files
      if(primaryFile) {
        const { filename, mimetype, encoding, createReadStream } = await primaryFile
        const stream = createReadStream()
        const arr = filename.split('.')
        const ext = '.' + arr[arr.length - 1]
        const oldPath = path + filename
        const newFileName = uniqNameGenerator() + ext
        const newPath = path + newFileName
        stream
          .on('error', err => {
            console.log(err)
            if(stream.truncated) fs.unlinkSync(path + filename)
          })
          .pipe(fs.createWriteStream(path + filename))
          .on('error', error => {
            if(error) {
              console.log('error pipe', error)
              throw new Error(error)
            }
          })
          .on('finish', () => {
            const fileSize = fs.statSync(oldPath)['size'] / 1000
            console.log(`uploaded (size ${fileSize} KB), renaming ${filename} with ${newFileName}`)
            fs.renameSync(oldPath, newPath, err => {
              if(err) {
                console.log(err)
                throw new Error(err)
              }
            })
          })
          .on('error', err => {
            if(err) {
              console.log('error when rename, file broken', err)
              throw new Error(err)
            }
          })
        setTimeout(() => {
          if(fs.existsSync(oldPath)) {
            const fileSize = fs.statSync(oldPath)['size'] / 1000
            console.log(`uploaded but broken (size ${fileSize} KB), renaming ${filename} with ${newFileName}`)
            fs.renameSync(oldPath, newPath, err => {
              if(err) {
                console.log(err)
                throw new Error(err)
              }
            })
          }
        }, 20000)
        dataReturn.push({ filename:newFileName, path, mimetype, encoding })
      }
      if(secondaryFile) {
        const { filename, mimetype, encoding, createReadStream } = await secondaryFile
        const stream = createReadStream()
        const arr = filename.split('.')
        const ext = '.' + arr[arr.length - 1]
        const oldPath = path + filename
        const newFileName = uniqNameGenerator() + ext
        const newPath = path + newFileName
        stream
          .on('error', err => {
            console.log(err)
            if(stream.truncated) fs.unlinkSync(path + filename)
          })
          .pipe(fs.createWriteStream(path + filename))
          .on('error', error => {
            if(error) {
              console.log('error pipe', error)
              throw new Error(error)
            }
          })
          .on('finish', () => {
            const fileSize = fs.statSync(oldPath)['size'] / 1000
            console.log(`uploaded (size ${fileSize} KB), renaming ${filename} with ${newFileName}`)
            fs.renameSync(oldPath, newPath, err => {
              if(err) console.log(err)
              throw new Error(err)
            })
          })
          .on('error', error => {
            if(error) {
              console.log('error when rename, file broken', error)
              throw new Error(error)
            }
          })
        setTimeout(() => {
          if(fs.existsSync(oldPath)) {
            const fileSize = fs.statSync(oldPath)['size'] / 1000
            console.log(`uploaded but broken (size ${fileSize} KB), renaming ${filename} with ${newFileName}`)
            fs.renameSync(oldPath, newPath, err => {
              if(err) {
                console.log(err)
                throw new Error(err)
              }
            })
          }
        }, 20000)
        dataReturn.push({ filename:newFileName, path, mimetype, encoding })
      }
      if(thirdFile) {
        const { filename, mimetype, encoding, createReadStream } = await thirdFile
        const stream = createReadStream()
        const arr = filename.split('.')
        const ext = '.' + arr[arr.length - 1]
        const oldPath = path + filename
        const newFileName = uniqNameGenerator() + ext
        const newPath = path + newFileName
        stream
          .on('error', err => {
            console.log(err)
            if(stream.truncated) fs.unlinkSync(path + filename)
          })
          .pipe(fs.createWriteStream(path + filename))
          .on('error', error => {
            if(error) {
              console.log('error pipe', error)
              throw new Error(error)
            }
          })
          .on('finish', () => {
            const fileSize = fs.statSync(oldPath)['size'] / 1000
            console.log(`uploaded (size ${fileSize} KB), renaming ${filename} with ${newFileName}`)
            fs.renameSync(oldPath, newPath, err => {
              if(err) console.log(err)
              throw new Error(err)
            })
          })
          .on('error', error => {
            if(error) {
              console.log('error when rename, file broken', error)
              throw new Error(error)
            }
          })
        setTimeout(() => {
          if(fs.existsSync(oldPath)) {
            const fileSize = fs.statSync(oldPath)['size'] / 1000
            console.log(`uploaded but broken (size ${fileSize} KB), renaming ${filename} with ${newFileName}`)
            fs.renameSync(oldPath, newPath, err => {
              if(err) {
                console.log(err)
                throw new Error(err)
              }
            })
          }
        }, 20000)
        dataReturn.push({ filename:newFileName, path, mimetype, encoding })
      }
      return dataReturn
    } catch(e) {
      console.log(e)
      throw new Error(e)
    }
  },
  upload_string_file: async (_parent, { files, data, ext }) => {
    let dataReturn = []
    try{
      if(files) {
        const [files_string] = files
        const { mimetype, encoding } = await files_string
        const newFileName = uniqNameGenerator() + '.' + ext
        const path = ATTACHMENT.UPLOAD_PATH + newFileName
        fs.writeFileSync(path, data, { encoding:'base64' })
        dataReturn.push({ filename:newFileName, path, mimetype, encoding })
      }
      return dataReturn
    }catch(e) {
      console.log(e)
      throw new Error(e)
    }
  }
}
export default uploadFileResolverMutation