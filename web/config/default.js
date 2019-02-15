module.exports = {
  port: 1337,
  parseServer: {
    databaseURI: 'mongodb://mongo:27017/dev',
    appId: 'classviz',
    masterKey: 'myMasterKey',
    serverURL: 'http://web:1337/api',
    publicServerURL: 'http://localhost:1337/api',
    appName: 'ClassViz',
    allowClientClassCreation: true
  },
  parseDashboard: {
    appId: 'classviz',
    masterKey: 'myMasterKey',
    serverURL: 'http://localhost:8080/api',
    appName: 'ClassViz',
    user: 'user',
    pass: 'pass'
  } 
}
 