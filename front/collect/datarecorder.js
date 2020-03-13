export var dataRecorder = {
    userID: null,
    userAgent: window.navigator.userAgent,
    hasTouch: null,
    OS: navigator.appVersion.match(/\(.+?\)/)[0].replace(/[\(\)]/g, ""),
    Browser: null,
    token: null,
    count: 0,
    framepool: [],
    init: function() {
        dataRecorder.getToken();
        dataRecorder.getUserId();
        dataRecorder.getTouchable();
        dataRecorder.getBrowser();
    },
    track: function(localevent) {
        /* Collect and send data */
        var track = {};
        track['d_path'] = dataRecorder.getElementPathByEvent(localevent);
        track['userid'] = dataRecorder.userID;
        track['osVersion'] = dataRecorder.OS;
        track['browser'] = dataRecorder.Browser;
        track['hastouch'] = dataRecorder.hasTouch;
        track['d_timestamp'] = (new Date()).getTime();
        track["d_source"] = localevent.view.location.href;
        track["d_clientWidth"] = localevent.srcElement.clientWidth;
        track["d_clientHeight"] = localevent.srcElement.clientHeight;
        for (var key in localevent) {
            if (typeof(localevent[key]) != "object") {
                track[key] = localevent[key];
            }
        }
        if (dataRecorder.count == 0) {
            dataRecorder.framepool = [];
        }
        dataRecorder.framepool.push(track)
        dataRecorder.count++;
        /* Accumulate records to 200, and send the package */
        if (dataRecorder.count > 19) {
            dataRecorder.count = 0;
            dataRecorder.submitData();
        }
    },
    submitData: function() {
        /* Send records to API */
        var s = "[";
        for (var i = 0; i < dataRecorder.framepool.length - 1; i++) {
            s += JSON.stringify(dataRecorder.framepool[i]) + ","
        }
        s += JSON.stringify(dataRecorder.framepool[dataRecorder.framepool.length - 1]) + "]";
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/api/student/question/dataCollect/log1', true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({ "data": s, "_token": dataRecorder.token }))
    },
    getTouchable: function() {
        dataRecorder.hasTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
    },
    getUserId: function() {
        var metas = document.getElementsByTagName("meta");
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].name == "profile-code") {
                dataRecorder.userID = metas[i].content;
                return;
            }
        }
    },
    getElementPathByEvent: function(event) {
        var target = event.target;
        var pathstr = "";
        pathstr = "," + target.tagName + "#" + target.id + "." + target.classList.value.replace(/ /g, ".") + pathstr;
        for (; target.parentElement != null;) {
            target = target.parentElement;
            pathstr = "," + target.tagName + "#" + target.id + "." + target.classList.value.replace(/ /g, ".") + pathstr;
        }
        return pathstr.slice(1);
    },
    getToken: function() {
        var metas = document.getElementsByTagName("meta");
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].name == "csrf-token") {
                dataRecorder.token = metas[i].content
                return;
            }
        }
    },
    getBrowser: function() {
        /* Browser name */
        var ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        dataRecorder.Browser = M.join(' ');
    },
}
dataRecorder.init();
window.addEventListener('unload', function(event) {
    dataRecorder.submitData();
});