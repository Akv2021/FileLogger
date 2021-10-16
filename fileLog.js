/**
* @author: [Abhishek Verma]
**/
// node -e 'require("./fileLog")("help")'
// var fileLog = require(global.Config.uploadDirPath + 'fileLog');
// fileLog({name:'result',value:result,stringify:true,uniqueName:true,moment:true,ext:'json',append:false,force:true,showerr:true,})

// To use filelog in some other repo, we can give absolute path in require()

// Use below snippets in vscode for autocompelte using extension - TS/JS Postfix completion
// {
//         "name": "rfl",
//         "description": "require fileLog",
//         "body": "const fileLog = require(global.Config.uploadDirPath + 'fileLog');",
//         "when": ["identifier"]
//       },
//       {
//         "name": "flg",
//         "description": "fileLog all params",
//         "body": "fileLog({enable:true,name:'{{expr}}',value:{{expr}},key:'{{expr}}',folder:'logs',stringify:true,uniqueName:true,append:false,single:true,first:false,last:false,moment:true,ext:'json',force:false,showerr:false,debug:false});",
//         "when": ["identifier","expression"]
//       },
//       {
//         "name": "ufl",
//         "description": "unique file",
//         "body": "fileLog({name:'{{expr}}',value:{{expr}},key:'{{expr}}',stringify:true,uniqueName:true,single:true});",
//         "when": ["identifier","expression"]
//       },
//       {
//         "name": "uflr",
//         "description": "unique file with require",
//         "body": "require(global.Config.uploadDirPath + 'fileLog')({name:'{{expr}}',value:{{expr}},key:'{{expr}}',stringify:true,uniqueName:true,single:true});",
//         "when": ["identifier","expression"]
//       },
//       {
//         "name": "sfl",
//         "description": "single value",
//         "body": "fileLog({name:'{{expr}}',value:{{expr}},key:'{{expr}}',stringify:true,append:false,single:true,first:false,last:false});",
//         "when": ["identifier","expression"]
//       },
//       {
//         "name": "sflr",
//         "description": "single value with require",
//         "body": "require(global.Config.uploadDirPath + 'fileLog')({name:'{{expr}}',value:{{expr}},key:'{{expr}}',stringify:true,append:false,single:true,first:false,last:false});",
//         "when": ["identifier","expression"]
//       },
//       {
//         "name": "afl",
//         "description": "same file",
//         "body": "fileLog({name:'afl',value:{{expr}},key:'{{expr}}',stringify:true,append:true,single:false,first:false,last:false});",
//         "when": ["identifier","expression"]
//       },
//       {
//         "name": "aflr",
//         "description": "same file with require",
//         "body": "require(global.Config.uploadDirPath + 'fileLog')({name:'afl',value:{{expr}},key:'{{expr}}',stringify:true,append:true,single:false,first:false,last:false});",
//         "when": ["identifier","expression"]
//       },

var fs = require('fs'),
    moment = require('moment');
    
    const substringMode = false;

    // todo : fix caller function name to include previous and next caller and  see if it works
    // https://www.thetopsites.net/article/50480823.shtml

    function getCaller() {
    var originalFunc = Error.prepareStackTrace;

    var cs;
    var callerfile;
    var callerfunction;
    var callerline;

    try {
        var err = new Error();
        var currentfile;
        // var nextCaller;
        // var prevCaller,prevType,prevMethod,
        // type,method,
        // nextStack,nextCaller,nextType,nextMethod;
        // console.log('lineno '+err.lineNumber);
        

        Error.prepareStackTrace = function (err, stack) { return stack; };
        // console.log(JOSN.stringify(err.stack.shift()));
        // console.log(JSON.stringify(err.stack));
        currentfile = err.stack.shift().getFileName();
        // console.log('CLG : Error.prepareStackTrace -> currentfile', currentfile);
        // console.log('Function name : '+ err.stack.shift().getFunctionName());
        // console.log('getMethodName() : '+ err.stack.shift().getMethodName());
        // console.log('getTypeName() : '+ err.stack.shift().getTypeName());
        // console.log('getLineNumber() : '+ err.stack.shift().getLineNumber());

        // var newStack = [...err.stack];
        // require('arya-commons').AWS.SES.sendEmail({
		// 	to: ['abhishek.kumar@indifi.com'],
		// 	subject: 'callerstack 3',
		// 	html: '<br><br><b>STACK</b><br>'+ (newStack).split(',').join('<br>')
        // })
        // console.log(typeof err.stack,Array.isArray(err.stack));
        // console.log(err.stack[0]);
        // console.log(JSON.stringify(err.stack[0]));
   
        while (err.stack.length) {

            // prevCaller = err.stack[0].getFunctionName();
            cs = err.stack.shift()
            callerfile = cs.getFileName();
            callerfunction = cs.getFunctionName();
            callerline = cs.getLineNumber();
            // type = cs.getTypeName();
            // method = cs.getMethodName();
            // console.log('CLG : Error.prepareStackTrace -> callerfile', callerfile);

            if(currentfile !== callerfile) {
                // function thisLine() {
                //     try {
                //       throw new Error();
                //     } catch (e) {
                //       const regex = /\d+:\d+/i;
                //       const match = regex.exec(e.stack.split("\n")[2]);
                //       return match[0];
                //     }
                //   }
                  
                //   console.log(thisLine());
                // nextStack = err.stack.shift();
                // nextCaller = err.stack.shift().getFunctionName();
                // nextType = nextStack.getTypeName();
                // nextMethod = nextStack.getMethodName();
        //         console.log('CLG : Error.prepareStackTrace -> currentfile', currentfile);
        // console.log('Function name : '+ err.stack.shift().getFunctionName());
        // console.log('getMethodName() : '+ err.stack.shift().getMethodName());
        // console.log('getTypeName() : '+ err.stack.shift().getTypeName());
        // console.log('getLineNumber() : '+ err.stack.shift().getLineNumber());
        // console.log('err.stack.shift()',err.stack.shift());
                break;

            }
            // else{
            //     prevCaller = cs.getFunctionName();
            //     prevType = cs.getTypeName();
            //     prevMethod = cs.getMethodName();
            // }
        }
    } catch (e) {
        console.error(e);
    }

    Error.prepareStackTrace = originalFunc; 

    if(substringMode){
        callerfile = callerfile.substring(callerfile.indexOf("arya")+4,callerfile.length);
    }
    // return `${callerfile} [${callerfunction}:${callerline}] >=> `;
    return `${callerfile}:${callerline} [${callerfunction}] >=> `;

}

var fileLog = function (data) {

    // help constructor
    if (typeof data == 'string' || typeof data == 'undefined'){
        // if(data.length>3 && data.name.substring(0,3) == 'afl'){
        
        // }
        help(data);
    }
    else {
        if (data.help)
            help(data.help);

        var defaultValues = {
            name: 'data',
            key: data.name,
            stringify: false,
            ext: "json",
            uniqueName: false,
            moment: false,
            append: false,
            first: false,
            last: false,
            single: false,
            showerr: false,
            debug: false,
            path: '/Users/abhishekkumarverma/Data/indifi/arya/uploads/',//global.Config.uploadDirPath, // use env or absolute path
            force: false,
            stack: true, // prepend caller details on main mssg
            // substringMode : false,
            sendEmail: false, // mails file, useful in stg when can't see logs. need to make generic on exporting "fileLog" utility
            folder: "bugs",// put all logs in this dir, default "logs"
            enable: true, // enable false to force stop all
            aflName: "fiNonServicable", // use this to give append file name - to enable, give data.name = 'afl'
            aflNew: true, // turns on aflMode. true = create new file on each run with "aflName_index.json" [index = 1...n], false = (over)write aflName.
            clean: true, // this replaces logger etc in input obj, pass this as false if error occured due to replacing
            forcePrint: false // this will override enable = false, useful in printing only single stmt 
        }

        // Note : aflMode is only available for json files
        data = Object.assign(defaultValues, data);
        // todo : use deepclone in cose of obj.hasownproperty = logger and data.clean = true
        // var dataKeys = typeof data.value == 'object' ? Object.keys(data.value) : [];
        // if(data.clean && dataKeys.length && dataKeys.includes("logger")){
        //     data = deepCopyFunction(data)
        // }

        if(data.value){
            // add general validations here
            data.uniqueName = (data.name == 'afl') ? false : data.uniqueName;
            data.stringify = (data.ext == 'json') ? true : data.stringify;

            data.sendEmail = (data.name == 'afl') && data.last && data.sendEmail;
            if((!data.enable) && (!data.forcePrint)){
                var caller = data.stack ? getCaller() : '';
                console.log(`Filelog disabled >> ${caller}${data.key}`);
                // console.log(`Filelog >> ~${(module.parent.filename).substring((module.parent.filename).indexOf("arya")+4,(module.parent.filename).length)}`);
                // console.log(`Filelog >> ${(module.parent.filename).replace('/Users/abhishekkumarverma/Data/indifi/arya','~')}`);
                // bloat : Doesn't work as expected due to anonymous function etc
                // console.log(arguments.callee.caller.name);
                // if (fileLog.caller == null) {
                //     console.log('The function was called from the top!');
                //   } else {
                //     console.log('This function\'s caller was ' + fileLog.caller.toString() + fileLog.caller.name);
                //   }
                // console.log(`Filelog >> ${__filename.slice(__dirname.length + 1)}`);
                // throw new Error('FileLog disabled');
                return module.parent.filename;
            }
        }else{
            var caller = data.stack ? getCaller() : '';
        // console.log('CLG : fileLog -> caller', caller);
            console.log(`\n ***Value not found for  : ${caller}${data.key}`);
            // console.error('Value not found for '+data.name);
            return module.parent.filename;
        }
  

        var deletedValues = {};
        if(data.key == 'req' || data.clean){
            if(data.value && data.value.logger){
                if(data.debug)
                    console.log('Overwriting logger');
                deletedValues.logger = data.value.logger;
                data.value.logger = 'Cleaned by fileLog to avoid write EPIPE';
            }
            cleanOutput(data.value,deletedValues,data.debug,data.key);
        }
        // else if(dataKeys.length>0 && )

        // bloat : read only support
        // const readOnly = false;
        // if(data.name.length>=3 && data.name.substring(0,3) == 'afl'){
        //     console.dir({constName,readOnly});
        //     if(data.first){
        //         console.log('executing constname');
        //         var constName = data.aflName + `_${new Date().getTime()}`;
        //         readOnly = true;
        //     }else if(data.last){
        //         readOnly = false;
        //     }

        //     if(readOnly || data.last){
        //         console.log('assigning from constname');
        //         data.name = constName; //+ `_${new Date().getTime()}`;
        //     }
        // } 

       
        var value;

        // PATH HANDLING
        data.path = data.path + data.folder + '/'
        if (!fs.existsSync(data.path)) {
            console.log("'" + data.path + "' folder does not exist. Creating now..");
            fs.mkdirSync(data.path);
        }
        // console.log('data.path : ',data.path);

        // / explicilty enable mail for aflMode
        // if(data.name == 'afl')
        //     data.sendEmail = data.sendEmail == false ? false : true;

        if(data.name == 'afl' && data.aflNew ){
            
            try {
                // will only work with .json extension files.
                if(fs.existsSync(data.path+data.aflName+'.json') || fs.existsSync(data.path+data.aflName+'_1.json')) {
                    if(data.first && data.debug){
                        fs.existsSync(data.path+data.aflName+'.json') ? 
                            console.log("The file exists. OldName : " + data.aflName+'.json') :
                            console.log("The file exists. OldName : " + data.aflName+'_1.json');
                    }
                    
                    let fileName = ((data.aflName).split('_')[0]).split('.')[0];
                    // this removes all numbers, so if numbers are used in fileName, comment below line;
                    fileName = fileName.replace(/[0-9]/g, ''); 

                    let oldIndex = parseInt(((data.aflName).split('_').pop()).split('.')[0]);
                    if(isNaN(oldIndex)){
                        oldIndex = 0;
                    }
                    let newName;

                    do {
                        oldIndex++;
                        newName = fileName + '_' + oldIndex;
                        if(data.first && data.debug)
                            console.log('Checking for : '+newName+'.json');
                    } while (fs.existsSync(data.path+newName+'.json'));

                    // create new file only in first iteration
                    if(data.first){
                        // if(data.debug)
                        console.log('Creating new file : ' + newName + '.' + data.ext );
                    }else{
                        if(oldIndex==1 && !fs.existsSync(data.path+newName+'.json')){
                            newName = fileName;
                        }else{
                            oldIndex--;
                            newName = fileName + '_' + oldIndex;
                        }
                        if(data.debug)
                            console.log('Reusing first file : ' + newName + '.' + data.ext );
                    }
                        data.aflName = newName;
                } else {
                    data.aflName = fs.existsSync(data.path+data.aflName+'.json') ? data.aflName + '_1' : data.aflName;
                    console.log('The file does not exist. Checked for ' + data.aflName+'.json');
                    data.first = true;
                }
            } catch (err) {
                console.error('Error occured while obtaining fileName',err);
            }
        }else{
            if(data.first)
            console.log('Not entered aflNew. Writing to '+data.aflName+'.json');
        }
        
        // default value for append in aflMode
        if(data.name == 'afl'){
            data.name = data.aflName;
            data.append = data.first ? false : true;//data.append;
        }

        // let filePath = global.Config.uploadDirPath + `${data.name}${data.uniqueName ? new Date().getTime() : ''}.${data.ext}`;
        let filePath = data.path + data.name + (data.uniqueName ? data.moment ? ` [${moment().format('LLLL')}]` : `_${new Date().getTime()}` : '') + `.${data.ext}`;
        // console.log('CLG : fileLog -> filePath', filePath);   
        // console.log('CLG : fileLog -> module.parent.filename', module.parent.filename);
        var caller = data.stack ? getCaller() : '';
        var uploadPath = substringMode ? `${data.folder}/${filePath.split('/').pop()}` : `\n${filePath}`;
        // console.log('CLG : fileLog -> caller', caller);
        console.log(`\n------> Logging : ${caller}${data.key} ==> ${uploadPath} <------\n`);

        // safe and forced stringifying
        if (data.stringify && data.ext == 'json') {
            if (!data.force) {
                try {
                    value = JSON.stringify(data.value);
                } catch (e) {
                    try {
                        if (data.showerr)
                            console.log(`fileLog -> e`, e);
                        // value = data.value;
                        value = circular(data.value, null, 2);
                    } catch (e2) {
                        try {
                            if (data.showerr)
                                console.log(`fileLog -> e2`, e2);
                            value = data.value;
                        } catch (e3) {
                            throw e3;
                        }
                    }
                }
            } else {
                value = JSON.stringify(data.value);
            }
        } else {
            value = data.value;
        }

        // Resultant input object to fileLog
        if (data.debug) {
            let clone = Object.assign({}, data, {
                value: value
            });
            if (typeof value == 'string' && value.length > 1000 || value instanceof Object)
                delete clone.value;
            console.log(clone);
        }

        // if(value)
        // console.log(`CLG : fileLog -> value`, value);

        // value after stringifying
        if (data.debug) {
            let message = `Before - `;
            if (value && value.length) {
                message = message + `length : ${value.length}, `;
            }
            if ((typeof value == 'string' && value.length < 1000) || typeof value != 'string') {
                message = message + `value: ${value}, `;
            }
            // console.log(`Before - ` + data.stringify && typeof value != 'undefined' && value.length < 10000 ? `value : ${value}, ` : `` + `type : ${typeof value}, isArray :${value instanceof Array}, isObject:${value instanceof Object}`);
            // let message = typeof value != 'undefined' && value.length > 1000 ? ` length : ${value.length}, ` : ` value : ${value}, `;
            message = message + `type : ${typeof value}, isArray :${value instanceof Array}, isObject:${value instanceof Object}`;
            // console.log(`Before -${message}`);
            console.log(message);
            if (typeof value != 'undefined')
                console.log('value[0]', value[0]);
        }

        // Auto prettify for json format
        if ((data.first || data.last || data.single || data.append) && data.ext == 'json') {
            if (typeof value != 'object' && (typeof value != 'string' || (typeof value == 'string' && !(value[0] == `"` || value[0] == `'` || value[0] == `{` || value[0] == `[`)))) {
                value = `"${value}"`;
            } else if (value instanceof Object && !data.stringify) {
                value = `"[object Object]"`;
            }
        }

        // value after prettifying
        if (data.debug) {
            let message = `After - `;
            if (value && value.length) {
                message = message + `length : ${value.length}, `;
            }
            if ((typeof value == 'string' && value.length < 1000) || typeof value != 'string') {
                message = message + `value: ${value}, `;
            }
            // console.log(`After - ` + data.stringify && typeof value != 'undefined' && value.length < 10000 ?  `value : ${value},` : `` + `type : ${typeof value}, isArray :${value instanceof Array}, isObject:${value instanceof Object}`);
            // let message = typeof value != 'undefined' && value.length > 10000 ? ` length : ${value.length}, ` : ` value : ${value}, `;
            message = message + `type : ${typeof value}, isArray :${value instanceof Array}, isObject:${value instanceof Object}`;
            // console.log(`After -${message}`);
            console.log(message);
            if (typeof value != 'undefined')
                console.log('value[0]', value[0]);
        }

        // make key value pairs for first & last call
        // if(data.ext == 'json'){
        //     if (data.first || data.single) {
        //             value = `{"${data.key}":${value}}`;
        //         } 
        //         // else { // /.?\x08/
        //         //     value = `/.?\x08/,"${data.key}":${value}}`;
        //         // }
        // }
        if (data.first && data.ext == 'json') {
            value = `{"${data.key}":${value}`;
        }
        else if (data.last && data.ext == 'json') { // /.?\x08/
            value = `,"${data.key}":${value}}`;
        } else if (data.single && data.ext == 'json') {
            value = `{"${data.key}":${value}}`;
        }

        // write to file (new or existing)
        if (data.append) {
            if (!data.last && !data.first && data.ext == 'json') {
                value = `,"${data.key}":${value}`;
                // value = '\ch,"'+data.key+'":'+value+'}';

            }
            fs.writeFileSync(filePath, value, {
                flag: 'a'
            }, (err) => {
                if (err) {
                    if (showerr) console.log(`[append] fileLog -> err`, err);
                    throw err;
                }
            })
        } else {
            fs.writeFileSync(filePath, value, (err) => {
                if (err) {
                    if (showerr) console.log(`fileLog -> err`, err);
                    throw err;
                }
            });
        }
        if(data.key == 'req' || data.clean){
            if(deletedValues.logger){
                if(data.debug)
                    console.log('Upserting logger');
                data.value.logger = deletedValues.logger;
                // data.value.logger = 'Cleaned by fileLog to avoid write EPIPE';
            }
            upsertInput(data.value,deletedValues,data.debug,data.key);
        }

        // mail when writing completes in afl mode

        if(data.sendEmail){
            console.log('Mailing fileLog response'); 
            var emailConfig = {
                to : ['abhishek.kumar@indifi.com'],
                subject: 'FileLog - ' + data.name,
                html: `PFA,<br>Sent by <b>FileLog</b> utility<br>Created by akvabhi`, 
                attachments: [{
                    filename: 'fileLog-resp.json',
                    path: filePath,
                    contentType: 'application/json'
                }]
            }
            require('arya-commons').AWS.SES.sendEmail(emailConfig)
            .then(() => {
                console.log('FileLog mail sent for '+ data.name + ' to ' + emailConfig.to);
            }).fail((e)=>{
                console.error('Error occured while sending FileLog mail ',e);
            })
        }

        return filePath;
    }

}

// bloat : trying closure for readonly support
// var something = (function() {
//     var executed = false;
//     return function() {
//         if (!executed) {
//             executed = true;
//             // do something
//         }
//     };
// })();

function cleanOutput(obj,deletedValues,debug,key){
    var bigValues = ["socket","connection","client","res"];
    var cleanCount = 0;
    for(let i=0;i<bigValues.length;i++){
        if(obj[bigValues[i]]){
            deletedValues[bigValues[i]] = obj[bigValues[i]];
            obj[bigValues[i]] = 'Cleaned by fileLog for prettier result';
            if(debug){
                // todo : generalise this
                console.log(`Overwriting ${key}.${bigValues[i]}`);
            }else{
                cleanCount++;
            }
        }
    }
    if(cleanCount && debug){
        console.log(`Overwritten ${cleanCount} values in ${key}`);
    }
    return obj;

}

function upsertInput(obj,deletedValues,debug,key){
    var bigValues = ["socket","connection","client","res"];
    var insertCount = 0;
    for(let i=0;i<bigValues.length;i++){
        if(deletedValues[bigValues[i]]){
            obj[bigValues[i]] = deletedValues[bigValues[i]] 
            // obj[bigValues[i]] = 'Cleaned by fileLog for prettier result';
            if(debug){
                console.log(`Inserted ${key}.${bigValues[i]}`);
            }else{
                insertCount++;
            }
        }
    }
    if(insertCount && debug){
        console.log(`Inserted ${insertCount} values in ${key}`);
    }
    return obj;

}

const deepCopyFunction = (inObject) => {
    let outObject, value, key
  
    if (typeof inObject !== "object" || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }
  
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}
  
    for (key in inObject) {
      value = inObject[key]
  
      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = deepCopyFunction(value)
    }
  
    return outObject
}

// todo check how to call this function from directly from terminal
function help(topic) {
    // help || undefined = all topics and handle misspelled string seperately
    // let defaultValues = {
    //     name: 'data',
    //     key: data.name,
    //     stringify: true,
    //     ext: "json",
    //     uniqueName: false,
    //     moment: false,
    //     append: false,
    //     first: false,
    //     last: false,
    //     showerr: false,
    //     debug: true,
    //     path: global.Config.uploadDirPath,
    //     force: false
    // }
    // name: 'res2',
    // key: 'userId',
    // stringify: false,
    // ext: 'json',
    // uniqueName: false,
    // moment: false,
    // append: true,
    // first: false,
    // last: true,
    // showerr: false,
    // debug: true,
    // path: '/Users/abhishekkumarverma/Data/indifi/arya/core-api/lib/../../uploads/',
    // force: false
    if (topic) {
        topic = topic.split(',');
        var helpText = [];
        let all = false;
        let text = '';
        if (topic == 'help' || topic == 'all')
            all = true;
        for (let i = 0; i < topic.length; i++) {
            const token = topic[i].trim().toLowerCase();
            // console.log(`Help -> `, token);
            switch (token) {
                case 'name':
                    description = 'fileName. Keep same for appending multiple values to the same file. [related = "uniqueName", default = "data"]';
                    helpText.push({
                        'name': description
                    });
                    if (!all)
                        break;
                case 'uniquename':
                    description = 'Boolean. true = append timestamp to fileName to generate new file each time. [related = "moment", NA : "append", default = false]';
                    helpText.push({
                        'uniqueName': description
                    });
                    if (!all)
                        break;
                case 'moment':
                    description = 'Boolean. true = append timestamp in human readable format else unix format. [dependency = "uniqueName" (true), default = false]';
                    helpText.push({
                        'moment': description
                    });
                    if (!all)
                        break;
                case 'ext':
                    description = 'extension of fileName. On changing ext, [NA : key(key-value pairs not generated), first, last, stringify, force, (auto-prettify is also disabled), default = json]';
                    helpText.push({
                        'ext': description
                    });
                    if (!all)
                        break;
                case 'path':
                    description = 'Directory path for saving file. [default = "arya/uploads"]';
                    helpText.push({
                        'path': description
                    });
                    if (!all)
                        break;

                case 'append':
                    description = 'Boolean. true = save result to existing file of fileName. If ext = json, key-value pairs are formed before appending. [NA : "uniqueName", related = "ext","first","last", default = false]';
                    helpText.push({
                        'append': description
                    });
                    if (!all)
                        break;

                case 'first':
                    description = 'Boolean. true = add extra opening brace before key-value pair. [default = false]';
                    helpText.push({
                        'first': description
                    });
                    if (!all)
                        break;

                case 'last':
                    description = 'Boolean. true = add extra closing brace after key-value pair. [dependency = "append" (true), default = false]';
                    helpText.push({
                        'last': description
                    });
                    if (!all)
                        break;

                case 'stringify':
                    description = 'Boolean. true = stringify the input value. Attempts safe stringify by default to resolve circular dependency. [dependency = "ext", related = "force", default = true]';
                    helpText.push({
                        'stringify': description
                    });
                    if (!all)
                        break;

                case 'force':
                    description = 'Boolean. true = skip safe stringifying and attempt direct stringifying. [dependency = "stringify" (true), default = false]';
                    helpText.push({
                        'force': description
                    });
                    if (!all)
                        break;

                case 'showerr':
                    description = 'Boolean. true = show all error caused in try-catch blocks while safe stringifying. [NA : force, related = "stringify" (true), default = true]';
                    helpText.push({
                        'showerr': description
                    });
                    if (!all)
                        break;

                case 'debug':
                    description = 'Boolean. true = show resultant input passed to the fileLog method. Then also value,value[0] & type after stringifying & prettifying. [default = false]';
                    helpText.push({
                        'debug': description
                    });
                    if (!all)
                        break;

                case 'key':
                    description = 'Name of variable whose value is logged. Useful when appending multiple key-value pairs in single file. [related = "ext","append", default = fileName]';
                    helpText.push({
                        'key': description
                    });
                    if (!all)
                        break;

                case 'value':
                    description = 'value to be logged. It is safe-stringified by default & prettified if (first,last,single or append) are present. value is absent in debug object. [related = "debug", default = NA]';
                    helpText.push({
                        'value': description
                    });
                    if (!all)
                        break;

                case 'single':
                    description = 'Boolean. true = key-value pair made using only current value. [NA : "append",related = "uniqueName", default = true]';
                    helpText.push({
                        'single': description
                    });
                    // if (!all)
                    break;

                    // case 'name':
                    //     description = 'Boolean. true =  append timestamp to fileName to generate new file each time. [related = "moment", default = false]';
                    //     helpText.push({
                    //         'name': description
                    //     });
                    //     if (!all)
                    //         break;

                    // case 'name':
                    //     description = 'Boolean. true =  append timestamp to fileName to generate new file each time. [related = "moment", default = false]';
                    //     helpText.push({
                    //         'name': description
                    //     });
                    //     if (!all)
                    //         break;


                default:

                    break;
            }
        }
        topic = topic.toLowerCase();

        // console.log('Assiting for ' + topic);
    } else {
        // console.log('Overall help');
    }
}

// don't beautify after this line
function circular(obj, replacer, spaces, cycleReplacer) {
    return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
    var stack = [],
        keys = []

    if (cycleReplacer == null) cycleReplacer = function (key, value) {
        if (stack[0] === value) return "[Circular ~]"
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
    }

    return function(key, value) {
    if (stack.length > 0) {
        var thisPos = stack.indexOf(this)
        ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
        ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
        if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
    }
}
module.exports = fileLog;

// bloat : solved using snippets
// todo ability to send values using array with minimum redundance
// fileLog = require(global.Config.uploadDirPath + 'fileLog');
// var values = [state, applicationId, userId, lmsConfig, req];
// var name = [state, applicationId, userId, lmsConfig, req]
// var template = {name:'res3',append:true};
// for(let i = 0; i < logs.length;i++ ){
//     let common = {name:'res3',append:true,key:}
//     let special = {};
//     if(i==0){
//         special = {first:true,append:false};
//     }else if(i== logs.length - 1){
//         special = {last:true};
//     }
// }


// todo support append mutiple values to same file with uniqueName - done

// fix help method for cli
// fix data.single
// todo iterate default values from object in help showdefaults function
// todo also put a process helptext.
// implement all helptext

// check console.dir({}) implementation
// add internals flag or extend debug to show stepwise progress
// handle JSON.parse if not required > SyntaxError: Unexpected token o in JSON at position 1
// at JSON.parse (<anonymous>)

// stringify by default iff input is obj
// how to show options for fileLog in intellisense
