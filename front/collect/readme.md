### Usage
1. datarecorder.js 
    * Collect mouse event attributes and send to API `/api/student/question/dataCollect/log1`.
    * If you want to change the API, please refer to the old one. It is provided by staff Leon.

2. eventloader.js
    * Inject script to iframe. 
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
