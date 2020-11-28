const mutationGenerator = (mutateType, tableName, data, id) => {
  switch (mutateType) {
    case 'INSERT': {
      let q = `insert into ${tableName} `
      let fields = ''
      let values = ''
      const loop = Object.getOwnPropertyNames(data)
      loop.forEach((field) => {
        fields += `"${field}", `
        const value = data[field]
        switch (typeof value) {
          case 'number': {
            values += `${value}, `
            break
          }
          case 'boolean': {
            values += `${value}, `
            break
          }
          case 'string': {
            values += `'${value}', `
            break
          }
          default:
            break
        }
      })

      return `${q} (${fields.slice(
        0,
        fields.length - 2
      )}) values (${values.slice(0, values.length - 2)}) returning "id";`
    }
    case 'UPDATE': {
      let q = `update ${tableName} set `
      let fields = ''
      let values = ''
      const loop = Object.getOwnPropertyNames(data)
      if (loop.length === 1) {
        const [field] = loop
        const val = data[field]
        if (val === null) {
          return `${q} ${field} = NULL where id = ${id};`
        } else {
          switch (typeof val) {
            case 'number':
              return `${q} ${field} = ${data[field]} where id = ${id};`
            case 'string':
              return `${q} ${field} = '${data[field]}' where id = ${id};`
            case 'boolean':
              return `${q} ${field} = ${data[field]} where id = ${id};`
            default:
              return
          }
        }
      }
      loop.forEach((field) => {
        fields += `"${field}", `
        const value = data[field]
        if (value === null) {
          values += 'NULL, '
        } else {
          switch (typeof value) {
            case 'number': {
              values += `${value}, `
              break
            }
            case 'boolean': {
              values += `${value}, `
              break
            }
            case 'string': {
              values += `'${value}', `
              break
            }
            default:
              break
          }
        }
      })
      return `${q} (${fields.slice(0, fields.length - 2)}) = (${values.slice(
        0,
        values.length - 2
      )}) where id = ${id};`
    }
    default:
      return ''
  }
}
export default mutationGenerator
