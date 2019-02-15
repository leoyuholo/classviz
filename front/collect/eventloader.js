import {dataRecorder} from './datarecorder.js';
export var eventLoader = {
    windowFrames: {},
    definedEvents: {
      handleMouseMove:function(event){
        dataRecorder.track(event)
      },
      handleMouseDown:function(event){
        dataRecorder.track(event)
      },
      handleMouseUp:function(event){
        dataRecorder.track(event)
      },
      handleMouseEnter:function(event){
        dataRecorder.track(event)
      },
      handleMouseLeave:function(event){
        dataRecorder.track(event)
      },
      handleMouseOut:function(event){
        dataRecorder.track(event)
      },
      handleMouseClick:function(event){
        if(! "result" in event){
          dataRecorder.track(event)
        }
      }
    },
    init: function(){
      eventLoader.windowFrames[window.location.href] = {"window":window,"document":document,"Y":0,"X":0};
      eventLoader.iframeCheckStart()
    },
    iframeCheckStart: function(){
      setTimeout(() => {
        eventLoader.iframeCheck(window, document);
        eventLoader.iframeCheckStart();
      }, 500)
    },
    iframeCheck: function(win, doc){
      /* Check if iframe exists in a new document*/
        if(win.location && win.location.href && win.location.href.indexOf("http")>=0){
          let localFrames = doc.getElementsByTagName("iframe");
          if( !eventLoader.windowFrames[win.location.href] ){
              eventLoader.initWindowEvent(win);
              eventLoader.windowFrames[win.location.href] = {}
              eventLoader.windowFrames[win.location.href]["window"] = win;
              eventLoader.windowFrames[win.location.href]["document"] = doc;
          }
          for(var i = 0;i < localFrames.length; i++){
            if( localFrames[i].contentWindow && localFrames[i].contentWindow.location.href ){
                /*  Check if iframe has loaded, if exist, deal with window content */
                eventLoader.iframeCheck(localFrames[i].contentWindow, localFrames[i].contentDocument)
            }
          }
        }
    },
    initWindowEvent: function(win){
      /* Add events, collect interaction data */
      win.onmousemove = _.throttle(eventLoader.definedEvents.handleMouseMove, 200);
      win.onclick = _.throttle(eventLoader.definedEvents.handleMouseClick, 200);
      win.onmousedown = _.throttle(eventLoader.definedEvents.handleMouseDown, 200);
      win.onmouseup = _.throttle(eventLoader.definedEvents.handleMouseUp, 200);
    }
}
eventLoader.init(); 