# FileLogger

JS Utility to create logs by printing values in JSON format in external files.

This utility internally uses following npm modules :

1. fs - Used to access and create files
2. moment (optional) - Used to print date in defined format.

Example :
<br>
```
// First require the utility
const fileLog = require(uploadDirPath + 'fileLog');

// Then pass the variable whose value is to be logged
fileLog({name:'afl',value:router,key:'router',stringify:true,append:true,single:false,first:false,last:false});
```
<br>
<br>
