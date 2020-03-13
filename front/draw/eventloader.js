import { coverMap } from './drawcover.js';
var questionTable = {
  /* priviate data , can't show here */
}
export var eventLoader = {
    windowFrames: {},
    init: function(){
      eventLoader.windowFrames[window.location.href] = {"window":window,"document":document,"Y":0,"X":0};
      eventLoader.iframeCheckStart();
    },  
    iframeCheckStart: function(){
      setTimeout(() => {
        eventLoader.iframeCheck(undefined,window, document);
        eventLoader.iframeCheckStart();
      }, 500)
    },
    iframeCheck: function(frm, win, doc){
        if(win.location && win.location.href && win.location.href.indexOf("http")>=0){
          let localFrames = doc.getElementsByTagName("iframe");
          if( !eventLoader.windowFrames[win.location.href] ){
              var s = win.location.href.match(/[a-z0-9]{15,20}/g);
              if(s && s.length > 0){
                var flag = true;
                for(var key in eventLoader.windowFrames){
                  var k = key.match(/[a-z0-9]{15,20}/g);
                  if(k && k.length > 0 && s[0] != k[0]){
                    delete eventLoader.windowFrames[key];
                  }else if(k && k.length > 0 && s[0] == k[0]){
                    flag = false;
                  }
                }
                if(flag){
                  coverMap.start(s[0]);
                }
              }
              let name = win.location.href.split("\/");
              if(!eventLoader.windowFrames[name[name.length-2]] && questionTable[name[name.length-2]] >= 1){
                window.scrollTo(0, 0);
                for(var i in eventLoader.windowFrames){
                  if(questionTable[i] >= 1){
                    delete eventLoader.windowFrames[i];
                  }
                }
                coverMap.start(questionTable[name[name.length-2]])
              }
              eventLoader.windowFrames[name[name.length-2]] = eventLoader.getElementCoords(frm)
              eventLoader.windowFrames[name[name.length-2]]["window"] = win;
              eventLoader.windowFrames[name[name.length-2]]["document"] = doc;
          }
          for(var i = 0;i < localFrames.length; i++){
            if( localFrames[i].contentWindow && localFrames[i].contentWindow.location.href ){
                /*  Check if iframe has loaded, if exist, deal with window content */
                eventLoader.iframeCheck(localFrames[i], localFrames[i].contentWindow, localFrames[i].contentDocument)
            }
          }
        }
    },
    getElementCoords: function(elem) {
      var box = elem.getBoundingClientRect();
      var body = document.body;
      var docEl = document.documentElement;
      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;
      var top  = box.top +  scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;
      return { "Y": Math.round(top), "X": Math.round(left) };
    },
    getCurrentElementSize: function(path){
      var s = "";
      var p = path.split(",");
      for(var i=0;i<p.length;i++){
          var attrs = p[i].split(/[#\.]/);
          s += attrs[0]
          if(attrs[1] != ""){
              s += "[id="+attrs[1]+"]";
          }
          if(attrs[2] != ""){
              s += "."+attrs[2];
          }
          s += " ";
      }
      return s;
    }
}
eventLoader.init();