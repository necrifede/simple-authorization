const { writeFileSync, readFileSync } = require('fs')
const { join } = require('path')

const statsFile = join(__dirname, 'stats.json')

const parseStats = (obj) => {
  try {
    return JSON.parse(obj)
  } catch (error) {
    return {}
  }
}

const read = () => {
  const rawStats = readFileSync(statsFile)
  return parseStats(rawStats)
}

const update = (message = {}) => {
  const rawStats = readFileSync(statsFile)
  const stats = parseStats(rawStats)
  
  // TODO: validate stats object
  return ({ numberOfCalls: (stats?.numberOfCalls ?? 0) + 1, lastMessage: { ...message } })
}

const write = (stats) => {
  const data = JSON.stringify(stats)
  writeFileSync(statsFile, data)
}

module.exports = {
  read,
  update,
  write
}