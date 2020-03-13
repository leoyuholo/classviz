import { dataRecorder } from './datarecorder.js';
export var eventLoader = {
    windowFrames: {},
    definedEvents: {
        /* define mouse events */
        handleMouseMove: function(event) {
            dataRecorder.track(event)
        },
        handleMouseDown: function(event) {
            dataRecorder.track(event)
        },
        handleMouseUp: function(event) {
            dataRecorder.track(event)
        },
        handleMouseEnter: function(event) {
            dataRecorder.track(event)
        },
        handleMouseLeave: function(event) {
            dataRecorder.track(event)
        },
        handleMouseOut: function(event) {
            dataRecorder.track(event)
        },
        handleMouseClick: function(event) {
            if (!"result" in event) {
                dataRecorder.track(event)
            }
        },
        /* define touch events */
        handleTouchmove: function(event) {
            dataRecorder.track(event)
        },
        handleTouchstart: function(event) {
            dataRecorder.track(event)
        },
        handleTouchend: function(event) {
            dataRecorder.track(event)
        },
        handleTouchleave: function(event) {
            dataRecorder.track(event)
        },
        handleMouseLeave: function(event) {
            dataRecorder.track(event)
        },
        handleTouchcancel: function(event) {
            dataRecorder.track(event)
        }
    },
    init: function() {
        eventLoader.initWindowEvent(window)
        eventLoader.windowFrames[window.location.href] = { "window": window, "document": document, "Y": 0, "X": 0 };
        eventLoader.iframeCheckStart()
    },
    iframeCheckStart: function() {
        setTimeout(() => {
            eventLoader.iframeCheck(window, document);
            eventLoader.iframeCheckStart();
        }, 500)
    },
    iframeCheck: function(win, doc) {
        /* Inject event recorder scripts to iframe*/
        /* Check if iframe exists in a new document*/
        if (win.location && win.location.href && win.location.href.indexOf("http") >= 0) {
            let localFrames = doc.getElementsByTagName("iframe");
            if (!eventLoader.windowFrames[win.location.href]) {
                eventLoader.initWindowEvent(win);
                eventLoader.windowFrames[win.location.href] = {}
                eventLoader.windowFrames[win.location.href]["window"] = win;
                eventLoader.windowFrames[win.location.href]["document"] = doc;
            }
            for (var i = 0; i < localFrames.length; i++) {
                if (localFrames[i].contentWindow && localFrames[i].contentWindow.location.href) {
                    /*  Check if iframe has loaded, if exist, deal with window content */
                    eventLoader.iframeCheck(localFrames[i].contentWindow, localFrames[i].contentDocument)
                }
            }
        }
    },
    initWindowEvent: function(win) {
        /* Add events, collect interaction data */
        if (dataRecorder.hasTouch) {
            /* Touch Events */
            win.ontouchmove = _.throttle(eventLoader.definedEvents.handleTouchmove, 20);
            win.ontouchstart = eventLoader.definedEvents.handleTouchstart;
            win.ontouchend = eventLoader.definedEvents.handleTouchend;
            win.ontouchleave = eventLoader.definedEvents.handleTouchleave;
            win.ontouchcancel = eventLoader.definedEvents.handleTouchcancel;
        } else {
            /* Mouse Events */
            win.onmousemove = _.throttle(eventLoader.definedEvents.handleMouseMove, 20);
            win.onclick = eventLoader.definedEvents.handleMouseClick;
            win.onmousedown = eventLoader.definedEvents.handleMouseDown;
            win.onmouseup = eventLoader.definedEvents.handleMouseUp;
        }
    }
}
eventLoader.init();