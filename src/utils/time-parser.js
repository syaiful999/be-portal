export const timeParser = val => {
  const [hh, mm] = val.split(':')
  if(hh && mm) {
    return `${hh}:${mm}`
  }
  return null
}