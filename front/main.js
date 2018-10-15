const api = classvizAPI

api.init()

const updateHTML = () => {
  api.getTracks({limit: 30})
    .then(tracks => {
      const track2String = track => `${track.createdAt}: ${track.userId}@${track.page} (${track.x}, ${track.y})`
      document.getElementById('xy-list').innerHTML = '<ul>' + tracks.map(track => `<li>${track2String(track)}</li>`).join('\n') + '</ul>'
    })
}

const handleMouseMove = event => {
  api.track(event.clientX, event.clientY, {userId: 'leo', page: 'index.html'})
    .then(() => updateHTML())
}

updateHTML()

document.onmousemove = _.throttle(handleMouseMove, 100)
