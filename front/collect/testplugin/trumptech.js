setTimeout(function() {
    var script = document.createElement('script');
    script.src = "http://127.0.0.1:5500/front/collect/bin/collect.js"
    document.body.appendChild(script);
}, 1000);