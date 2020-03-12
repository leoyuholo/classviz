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

## Deployment
Steps to apply it to another platform. 
1. In `evertloader.js`, find `definedEvents` and function `initWindowEvent` add or remove mouse events that you want.
2. In `evertloader.js`, find function `initWindowEvent`, set trigger threshold for mouse events.
3. In `datarecorder.js`, find function `track`, it combines two set of attributes, (a) the new defined in `track` like `userid, osVersion...` ,(b) proto attributes in mouse event.
4. Please refer to API `/api/student/question/dataCollect/log1` and make sure your backend accepts the correct format.
5. Install webpack and run `$webpack --config webpack.config.js`, then put `./bin/collect.js` to footer part of html.