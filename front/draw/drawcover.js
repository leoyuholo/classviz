import {commonTool} from './common.js';
require('./simpleheat.js');
export var coverMap = {
        miniWidth: 300,
        miniHeatRate: 300/parseFloat(window.innerWidth),
        miniHeatMap:{},  
        heatMap:{},
        columnSet:{},
        initHeatMapHtml: function(){
            var bdw = $("body")[0].clientWidth;
            var bdh = $("body")[0].clientHeight;
            var heatmapDIV = document.createElement("div");
            heatmapDIV.innerHTML = `
                                <div id="heatmapWrap" style="z-index:9999;background:rgba(192,192,192,0.2);pointer-events: none;opacity: 1; width: `+bdw+`px; height: `+bdh+`px; left: 0px; top: 0px; display: block;position:absolute">
                                    <canvas id="heatmap" width="`+bdw+`" height="`+bdh+`" style="position: absolute; left: 0px; top: 0px;"></canvas>
                                </div>
                                <div class="sidenav">
                                    <form style="margin:0px">
                                        <select id="id_select" onchange=coverMap.refreshHeatMap() name="condiment" class="selectpicker required" style="background: beige;" >
                                            <option value="mousemove">Mouse Move</option>
                                            <option value="click">Mouse Click</option>
                                        </select>
                                    </form>
                                    <div class="options">
                                    <p class="heatmapconfig">Heatmap config</p>
                                        <label>Radius: </label><input type="range" id="id_radius" value="25" min="10" max="50" /><br />
                                        <label style="padding-right: 18px;">Blur: </label><input type="range" id="id_blur" value="15" min="10" max="50" />
                                    </div>
                                    <p class="minioverview">Mini heatmap for overview</p>
                                    <canvas id="miniheatmap" width="`+coverMap.miniWidth+`px" height="`+bdh+`px" style="background:rgba(192,192,192,0.2)"></canvas>
                                </div>
                            `;
            $("body")[0].append(heatmapDIV);
        },
        filterDataByType: function(arrays, type, column){
            var newarr = [];
            for(var i=0;i<arrays.length;i++){
                var obj = {};
                if(commonTool.windowFrames[arrays[i][column["d_source"]]]){
                    if(type == "mousemove"){
                        if(arrays[i][column["type"]] == "mousemove"){
                            obj["x"] = commonTool.windowFrames[arrays[i][column["d_source"]]]["X"] + arrays[i][column["pageX"]];
                            obj["y"] = commonTool.windowFrames[arrays[i][column["d_source"]]]["Y"] + arrays[i][column["pageY"]];
                            newarr.push([obj.x,obj.y,1])
                        }
                    }else{
                        if(arrays[i][column["type"]] == "mousedown" || arrays[i][column["type"]] == "mouseup"){
                            obj["x"] = commonTool.windowFrames[arrays[i][column["d_source"]]]["X"] + arrays[i][column["pageX"]] ;
                            obj["y"] = commonTool.windowFrames[arrays[i][column["d_source"]]]["Y"] + arrays[i][column["pageY"]] ;
                            newarr.push([obj.x,obj.y,1])
                        }
                    }
                }
            }
            return newarr;
        },
        getMinidata:function (localdata){
            var minidata = []
            for(var i=0;i<localdata.length;i++){
                minidata.push([localdata[i][0] * coverMap.miniHeatRate, localdata[i][1] * coverMap.miniHeatRate, localdata[i][2]])
            }
            return minidata;
        },
        refreshHeatMap: function(){
            var type = $("#id_select")[0].value;
            coverMap.heatMap.clear();
            coverMap.miniHeatMap.clear();
            var localdata = coverMap.filterDataByType(data["results"], type, coverMap.columnSet);
            coverMap.heatMap.data(localdata).draw();
            coverMap.miniHeatMap.data(coverMap.getMinidata(localdata)).draw();
            coverMap.setHeatMap();
        },
        drawheatmap: function(localdata, canvas){
            var heat = simpleheat(canvas);
            heat.data(localdata);
            heat.max(10);
            return heat;
        },
        setHeatMap: function(){
            var r = parseInt($("#id_radius")[0].value);
            var b = parseInt($("#id_blur")[0].value);
            coverMap.heatMap.radius(r, b);
            coverMap.miniHeatMap.radius(coverMap.miniHeatRate * r, coverMap.miniHeatRate * b);
            coverMap.heatMap.draw();
            coverMap.miniHeatMap.draw();
        },
        start: function(qid){
            // var id = url.match(/[a-z0-9]{15,20}/g)[0];
            var xhr = new XMLHttpRequest();
            xhr.open('GET','/api/student/question/dataCollect/getModel1?questionId='+qid, true);
            xhr.onreadystatechange=function(){
                if (xhr.readyState == 4 && xhr.status == 200){
                    // console.log(xmlhttp.responseText)
                    var returnData = JSON.parse(xhr.responseText);
                    for(var i=0;i<returnData["columnList"].length;i++){
                        coverMap.columnSet[returnData["columnList"][i]] = i
                    };
                    var result = returnData["data"];
                    var localdata = coverMap.filterDataByType(result, "mousemove", coverMap.columnSet);
                    coverMap.heatMap = coverMap.drawheatmap(localdata, $("#heatmap")[0]);
                    coverMap.miniHeatMap = coverMap.drawheatmap(coverMap.getMinidata(localdata), $("#miniheatmap")[0]);
                    coverMap.setHeatMap();
                    setTimeout(function(){
                        $("#id_radius").change(function(e){
                            coverMap.setHeatMap();
                        })
                        $("#id_blur").change(function(e){
                            coverMap.setHeatMap();
                        })
                    },1000)
                }
            }
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        }
}
coverMap.initHeatMapHtml();