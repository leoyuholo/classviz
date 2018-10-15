const express = require('express')
const config = require('config')
const ParseDashboard = require('parse-dashboard')
const parseServer = require('parse-server')
const ParseServer = parseServer.ParseServer

const app = express()

const parse = new ParseServer({
  databaseURI: config.get('parseServer.databaseURI'),
  appId: config.get('parseServer.appId'),
  masterKey: config.get('parseServer.masterKey'),
  serverURL: config.get('parseServer.serverURL'),
  publicServerURL: config.get('parseServer.publicServerURL'),
  appName: config.get('parseServer.appName'),
  allowClientClassCreation: config.get('parseServer.allowClientClassCreation')
})

const dashboard = new ParseDashboard({
  apps: [{
    appId: config.get('parseDashboard.appId'),
    masterKey: config.get('parseDashboard.masterKey'),
    serverURL: config.get('parseDashboard.serverURL'),
    appName: config.get('parseDashboard.appName')
  }],
  users: [{
    user: config.get('parseDashboard.user'),
    pass: config.get('parseDashboard.pass')
  }],
  trustProxy: 1
}, { allowInsecureHTTP: true })

app.use('/api', parse)

app.use('/dashboard', dashboard)

app.listen(config.get('port'), () => {
  console.log('server running on port', config.get('port'))
})
