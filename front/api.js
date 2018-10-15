window.classvizAPI = {
  init: () => {
    const appId = 'classviz'
    const serverURL = 'http://localhost:8080/api'

    Parse.initialize(appId)
    Parse.serverURL = serverURL
  },

  track: (x, y, metaInfo) => {
    const Track = Parse.Object.extend('Track')

    const track = new Track()
    track.set('x', x)
    track.set('y', y)

    _.forEach(metaInfo, (v, k) => {
      track.set(k, v)
    })

    return track.save()
  },

  getTracks: ({ limit }) => {
    const Track = Parse.Object.extend('Track')

    const query = new Parse.Query(Track)

    return query.descending('createdAt').limit(limit).find()
      .then(results => results.map(result => result.toJSON()))
  }
}
