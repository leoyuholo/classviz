## Usage
1. datarecorder.js 
    * Collect mouse event attributes and send to API `/api/student/question/dataCollect/log1`.
    * If you want to change the API, please refer to the old one. It is provided by staff Leon.

2. eventloader.js
    * Inject script to iframe and all sub-iframe if exists.
    * Define available events to listen and record.
    * Use datarecorder.js to collect clickstream data.

3. /bin/collect.js
    * webpack bundled file of the two js file.

```
hostname: alysvr9.***.com
ip address: \*\*.\*\*.209.120
```

Script location
```
/opt/***/***/html/***/collect.js
```

## Script Test
A quick guide on how to test this script. We can make use of chrome plugin, add this script to our website to test it.
1. Open a live server locally, ensure we can access collect.js with browser.
2. Open `testplugin/manifest.json`, modify the `"matches": ["https://www.w3schools.com/*"],`, change or add your __own url__. Please refer to https://developer.chrome.com/extensions/match_patterns 
3. Open `testplugin/trumptech.js`, modify `script.src = "http://127.0.0.1:5500/front/collect/bin/collect.js"`, make sure it is the correct url in step 1 of `collect.js`.
4. Open Chrome and add testplugin to your extension. Enable it.
5. Open your __own url__ with Chrome, make enough mouse move, click, etc. Check `devTool => Network` in Chrome, you will see, log1 request. Which contains mouse interaction information.

## Deployment Tips
Steps to apply it to another platform. 
1. In `evertloader.js`, find `definedEvents` and function `initWindowEvent` add or remove mouse/touch events that you want.
2. In `evertloader.js`, find function `initWindowEvent`, set trigger threshold for mouse events.
3. In `datarecorder.js`, find function `track`, it combines two set of attributes, (a) the new defined in `track` like `userid, osVersion...` ,(b) proto attributes in mouse event.
4. Please refer to API `/api/student/question/dataCollect/log1` and make sure your backend accepts the correct format.
5. Install webpack and run `$webpack --config webpack.config.js`, then put `./bin/collect.js` to footer part of html.
