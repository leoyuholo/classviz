setTimeout(function() {
    var scriptlod = document.createElement('script');
    scriptlod.src = "https://unpkg.com/lodash@4.17.11/lodash.min.js"
    document.body.appendChild(scriptlod);
    var script = document.createElement('script');
    script.src = "http://127.0.0.1:5500/front/collect/bin/collect.js"
    document.body.appendChild(script);
}, 1000);