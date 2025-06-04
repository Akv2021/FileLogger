/**
 * Enhanced File Logger Utility
 * @author: Abhishek Verma
 * @version: 2.0.0
 * @description: Advanced file logging utility with format options and error handling
 */

const fs = require('fs');
const moment = require('moment');

const SUBSTRING_MODE = false;

// Default configuration
const DEFAULT_OPTIONS = {
    name: 'data',
    key: null,
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
    path: process.env.LOG_PATH || './logs/',
    force: false,
    stack: true,
    sendEmail: false,
    folder: "logs",
    enable: true,
    aflName: "fiNonServicable",
    aflNew: true,
    clean: true,
    forcePrint: false
};

// Caller tracking function
function getCaller() {
    var originalFunc = Error.prepareStackTrace;
    var cs;
    var callerfile;
    var callerfunction;
    var callerline;

    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };
        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            cs = err.stack.shift()
            callerfile = cs.getFileName();
            callerfunction = cs.getFunctionName();
            callerline = cs.getLineNumber();

            if(currentfile !== callerfile) {
                break;
            }
        }
    } catch (e) {
        console.error(e);
    }

    Error.prepareStackTrace = originalFunc; 

    if(SUBSTRING_MODE){
        callerfile = callerfile.substring(callerfile.indexOf("arya")+4,callerfile.length);
    }
    return `${callerfile}:${callerline} [${callerfunction}] >=> `;
}

function fileLog(data) {
    // Handle help requests
    if (typeof data === 'string' || typeof data === 'undefined') {
        return help(data);
    }

    // Merge defaults with provided options
    const options = { ...DEFAULT_OPTIONS, ...data };

    if (!options.value) {
        const caller = options.stack ? getCaller() : '';
        console.log(`\n \u001b[1;31m ***Value not found for  : ${caller}${options.key}\u001b[0m`);
        return module.parent.filename;
    }

    if ((!options.enable) && (!options.forcePrint)) {
        const caller = options.stack ? getCaller() : '';
        console.log(`Filelog disabled >> ${caller}${options.key}`);
        return module.parent.filename;
    }

    let deletedValues = {};
    if (options.key === 'req' || options.clean) {
        if (options.value && options.value.logger) {
            if (options.debug) console.log('Overwriting logger');
            deletedValues.logger = options.value.logger;
            options.value.logger = 'Cleaned by fileLog to avoid write EPIPE';
        }
        cleanOutput(options.value, deletedValues, options.debug, options.key);
    }

    let value = processValue(options);
    const filePath = getFilePath(options);

    logToConsole(options, filePath);

    writeToFile(options, value, filePath);

    if (options.key === 'req' || options.clean) {
        if (deletedValues.logger) {
            if (options.debug) console.log('Upserting logger');
            options.value.logger = deletedValues.logger;
        }
        upsertInput(options.value, deletedValues, options.debug, options.key);
    }

    if (options.sendEmail) {
        sendEmailWithLog(options, filePath);
    }

    return filePath;
}

function processValue(options) {
    let value = options.value;

    if (options.stringify && options.ext === 'json') {
        value = safeStringify(value, options);
    }

    if (options.debug) {
        console.log(`Before - length: ${value?.length}, type: ${typeof value}, isArray: ${Array.isArray(value)}, isObject: ${typeof value === 'object'}`);
        if (value !== undefined) console.log('value[0]', value[0]);
    }

    value = formatForJson(value, options);

    if (options.debug) {
        console.log(`After - length: ${value?.length}, type: ${typeof value}, isArray: ${Array.isArray(value)}, isObject: ${typeof value === 'object'}`);
        if (value !== undefined) console.log('value[0]', value[0]);
    }

    return value;
}

function getFilePath(options) {
    options.path = `${options.path}${options.folder}/`;
    if (!fs.existsSync(options.path)) {
        console.log(`'${options.path}' folder does not exist. Creating now..`);
        fs.mkdirSync(options.path, { recursive: true });
    }

    if (options.name === 'afl' && options.aflNew) {
        options.name = getUniqueAflName(options);
    }

    let fileName = options.name;
    if (options.uniqueName) {
        fileName += options.moment ? ` [${moment().format('LLLL')}]` : `_${Date.now()}`;
    }
    return `${options.path}${fileName}.${options.ext}`;
}

function writeToFile(options, value, filePath) {
    const writeOptions = { flag: options.append ? 'a' : 'w' };
    fs.writeFileSync(filePath, value, writeOptions, (err) => {
        if (err && options.showerr) console.log(`fileLog write error:`, err);
    });
}

function safeStringify(value, options) {
    if (!options.force) {
        try {
            return JSON.stringify(value, null, 4);
        } catch (e) {
            try {
                if (options.showerr) console.log(`fileLog stringify error:`, e);
                return circular(value, null, 4);
            } catch (e2) {
                if (options.showerr) console.log(`fileLog circular stringify error:`, e2);
                return value;
            }
        }
    }
    return JSON.stringify(value, null, 4);
}

function formatForJson(value, options) {
    if ((options.first || options.last || options.single || options.append) && options.ext === 'json') {
        if (typeof value !== 'object' && (typeof value !== 'string' || !['[', '{', '"', "'"].includes(value[0]))) {
            value = `"${value}"`;
        } else if (value instanceof Object && !options.stringify) {
            value = `"[object Object]"`;
        }
    }

    if (options.first && options.ext === 'json') {
        value = `{"${options.key}":${value}`;
    } else if (options.last && options.ext === 'json') {
        value = `,"${options.key}":${value}}`;
    } else if (options.single && options.ext === 'json') {
        value = `{"${options.key}":${value}}`;
    } else if (options.append && !options.last && !options.first && options.ext === 'json') {
        value = `,"${options.key}":${value}`;
    }

    return value;
}

function cleanOutput(obj, deletedValues, debug, key) {
    const bigValues = ["socket", "connection", "client", "res"];
    let cleanCount = 0;
    for (let i = 0; i < bigValues.length; i++) {
        if (obj[bigValues[i]]) {
            deletedValues[bigValues[i]] = obj[bigValues[i]];
            obj[bigValues[i]] = 'Cleaned by fileLog for prettier result';
            debug ? console.log(`Overwriting ${key}.${bigValues[i]}`) : cleanCount++;
        }
    }
    if (cleanCount && debug) {
        console.log(`Overwritten ${cleanCount} values in ${key}`);
    }
    return obj;
}

function upsertInput(obj, deletedValues, debug, key) {
    const bigValues = ["socket", "connection", "client", "res"];
    let insertCount = 0;
    for (let i = 0; i < bigValues.length; i++) {
        if (deletedValues[bigValues[i]]) {
            obj[bigValues[i]] = deletedValues[bigValues[i]];
            debug ? console.log(`Inserted ${key}.${bigValues[i]}`) : insertCount++;
        }
    }
    if (insertCount && debug) {
        console.log(`Inserted ${insertCount} values in ${key}`);
    }
    return obj;
}

function circular(obj, replacer, spaces, cycleReplacer) {
    return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
}

function serializer(replacer, cycleReplacer) {
    const stack = [];
    const keys = [];

    if (cycleReplacer == null) {
        cycleReplacer = function(key, value) {
            if (stack[0] === value) return "[Circular ~]";
            return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
        };
    }

    return function(key, value) {
        if (stack.length > 0) {) {
            const thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
        } else {
            stack.push(value);
        }
        return replacer == null ? value : replacer.call(this, key, value);
    };
}

function help(topic) {
    const helpTopics = {
        name: 'fileName. Keep same for appending multiple values to the same file. [related = "uniqueName", default = "data"]',
        uniqueName: 'Boolean. true = append timestamp to fileName to generate new file each time. [related = "moment", NA : "append", default = false]',
        moment: 'Boolean. true = append timestamp in human readable format else unix format. [dependency = "uniqueName" (true), default = false]',
        ext: 'extension of fileName. On changing ext, [NA : key(key-value pairs not generated), first, last, stringify, force, (auto-prettify is also disabled), default = json]',
        path: 'Directory path for saving file. [default = "logs"]',
        append: 'Boolean. true = save result to existing file of fileName. If ext = json, key-value pairs are formed before appending. [NA : "uniqueName", related = "ext","first","last", default = false]',
        first: 'Boolean. true = add extra opening brace before key-value pair. [default = false]',
        last: 'Boolean. true = add extra closing brace after key-value pair. [dependency = "append" (true), default = false]',
        stringify: 'Boolean. true = stringify the input value. Attempts safe stringify by default to resolve circular dependency. [dependency = "ext", related = "force", default = true]',
        force: 'Boolean. true = skip safe stringifying and attempt direct stringifying. [dependency = "stringify" (true), default = false]',
        showerr: 'Boolean. true = show all error caused in try-catch blocks while safe stringifying. [NA : force, related = "stringify" (true), default = true]',
        debug: 'Boolean. true = show resultant it input passed to the fileLog method. Then also value,value[0] & type after stringifying & prettifying. [default = false]',
        key: 'Name of variable whose value is logged. Useful when appending multiple key-value pairs in single file. [related = "ext","append", default = fileName]',
        value: 'value to be logged. It is safe-stringified by default & prettified if (first,last,single or append) are present. value is absent in debug object. [related = "debug", default = NA]',
        single: 'Boolean. true = key-value pair made using only current value. [NA : "append",related = "uniqueName", default = true]'
    };

    if (!topic || topic === 'help' || topic === 'all') {
        console.log('FileLog Help:\n');
        Object.entries(helpTopics).forEach(([key, value]) => {
            console.log(`${key}:\n  ${value}\n`);
        });
    } else {
        const topics = topic.split(',').map(t => t.trim().toLowerCase());
        topics.forEach(t => {
            if (helpTopics[t]) {
                console.log(`${t}:\n  ${helpTopics[t]}\n`);
            } else {
                console.log(`No help available for topic: ${t}`);
            }
        });
    }
}

module.exports = fileLog;
