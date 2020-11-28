import moment from 'moment'

const filter = ({ logic, filters }) => {
  let where = 'where 1=1 and ('
  filters.forEach((item, index) => {
    switch (item.type) {
      case 'string': {
        where += stringGenerator(item)
        break
      }
      case 'numeric': {
        where += numericGenerator(item)
        break
      }
      case 'date': {
        where += dateGenerator(item)
        break
      }
      case 'boolean': {
        where += booleanGenerator(item)
        break
      }
    }
    if (index + 1 < filters.length) {
      where += `${logic} `
    } else {
      where += ')'
    }
  })
  return where
}
const stringGenerator = item => {
  let val = ''
  switch (item.operator) {
    case 'contains': {
      val += `LOWER("${item.field}") like LOWER('%${item.value}%') `
      break
    }
    case 'not_contains': {
      val += `LOWER("${item.field}") not like LOWER('%${item.value}%') `
      break
    }
    case 'start_with': {
      val += `LOWER("${item.field}") like LOWER('%${item.value}') `
      break
    }
    case 'end_with': {
      val += `LOWER("${item.field}") like LOWER('${item.value}%') `
      break
    }
    default: {
      val += `LOWER("${item.field}") = LOWER('${item.value}') `
      break
    }
  }
  return val
}
const numericGenerator = item => {
  let val = ''
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" = ${item.value} `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> ${item.value} `
      break
    }
    case 'gt': {
      val += `"${item.field}" > ${item.value} `
      break
    }
    case 'gte': {
      val += `"${item.field}" >= ${item.value} `
      break
    }
    case 'lt': {
      val += `"${item.field}" < ${item.value} `
      break
    }
    case 'lte': {
      val += `"${item.field}" <= ${item.value} `
      break
    }
    default: {
      val += `"${item.field}" = ${item.value} `
      break
    }
  }
  return val
}
const booleanGenerator = item => {
  let val = ''
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" = ${item.value} `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> ${item.value} `
      break
    }
    default: {
      val += `"${item.field}" = ${item.value} `
      break
    }
  }
  return val
}
const dateGenerator = item => {
  let val = ''
  const value = moment(new Date(item.value)).format('YYYY-MM-DD HH:mm:ss')
  const startDate = moment(new Date(item.value)).format('YYYY-MM-DD 00:00:00')
  const endDate = moment(new Date(item.value)).format('YYYY-MM-DD 23:59:59')
  switch (item.operator) {
    case 'eq': {
      val += `"${item.field}" >= '${startDate}' and "${item.field}" <= '${endDate}' `
      break
    }
    case 'neq': {
      val += `"${item.field}" <> '${value}' `
      break
    }
    case 'gt': {
      val += `"${item.field}" > '${value}' `
      break
    }
    case 'gte': {
      val += `"${item.field}" >= '${value}' `
      break
    }
    case 'lt': {
      val += `"${item.field}" < '${value}' `
      break
    }
    case 'lte': {
      val += `"${item.field}" <= '${value}' `
      break
    }
    default: {
      val += `"${item.field}" = '${value}' `
      break
    }
  }
  return val
}

const sort = ({ dir, field }) => {
  return ` ORDER BY "${field}" ${dir}`
}
const limit = (skip, take) => {
  return ` limit ${take} offset ${skip}`
}
export const whereGenerator = { filter, sort, limit }