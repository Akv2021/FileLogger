
# FileLogger
A powerful Node.js utility for flexible file logging with support for JSON formatting, append operations, and error handling.

## 🚀 Features

### Core Features
- 📝 Multiple file formats support (JSON, text)
- 🔄 Append or create new files
- 🎯 Unique file naming with timestamps
- 🛡️ Safe handling of circular references
- 🧹 Auto-cleanup of large objects
- 📊 Debug mode for detailed logging

### Advanced Features
- 📎 JSON pretty printing
- ⚡ Automatic file creation
- 🔍 Stack trace logging
- 📅 Moment.js timestamp formatting
- 🔒 Safe stringification
- 📨 Email notifications (optional)

## 🔥 Quick Start

```javascript
const fileLog = require('file-logger-utility');

// Basic usage
fileLog({
    name: 'mylog',
    value: { data: 'example' },
    stringify: true
});

// Append mode
fileLog({
    name: 'mylog',
    value: { newData: 'example' },
    append: true
});
```

## 💡 Use Cases

### 1. API Response Logging
```javascript
app.get('/api/data', (req, res) => {
    fileLog({
        name: 'api_responses',
        value: res.data,
        uniqueName: true,
        moment: true
    });
});
```

### 2. Debug Logging
```javascript
fileLog({
    name: 'debug',
    value: debugData,
    debug: true,
    showerr: true
});
```

### 3. Continuous Logging
```javascript
// First entry
fileLog({
    name: 'continuous_log',
    value: firstData,
    first: true
});

// Middle entries
fileLog({
    name: 'continuous_log',
    value: middleData,
    append: true
});

// Last entry
fileLog({
    name: 'continuous_log',
    value: lastData,
    append: true,
    last: true
});
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| name | string | 'data' | File name for the log |
| value | any | - | Data to be logged |
| stringify | boolean | false | Auto-stringify data |
| ext | string | 'json' | File extension |
| uniqueName | boolean | false | Add timestamp to filename |
| moment | boolean | false | Use readable timestamps |
| append | boolean | false | Append to existing file |
| debug | boolean | false | Show debug information |
| folder | string | 'logs' | Output folder name |

## 🎯 Special Modes

### JSON Mode
```javascript
fileLog({
    name: 'data',
    value: { key: 'value' },
    ext: 'json',
    stringify: true
});
```

### Debug Mode
```javascript
fileLog({
    name: 'debug_log',
    value: complexObject,
    debug: true,
    showerr: true
});
```

### Append Mode
```javascript
fileLog({
    name: 'append_log',
    value: data,
    append: true,
    first: true  // for first entry
    // or
    last: true   // for last entry
});
```

## 🔍 Help System

Get help on specific features:
```javascript
fileLog('help');  // All topics
fileLog('name');  // Help on filename
fileLog('append,stringify');  // Multiple topics
```

## 🚨 Error Handling

The utility handles various error scenarios:
- Circular references in objects
- File system errors
- Invalid JSON
- Large objects cleanup

```javascript
fileLog({
    name: 'error_log',
    value: circularObject,
    showerr: true,
    force: false  // Use safe stringify
});
```

## 🛠️ Advanced Usage

### Custom Path
```javascript
fileLog({
    name: 'custom_log',
    value: data,
    path: '/custom/path/to/logs/'
});
```

### Clean Large Objects
```javascript
fileLog({
    name: 'clean_log',
    value: largeObject,
    clean: true,
    debug: true
});
```

### Unique File Names
```javascript
fileLog({
    name: 'unique_log',
    value: data,
    uniqueName: true,
    moment: true  // Use readable timestamp
});
```

## 📝 Best Practices

1. **Use Debug Mode** for development
   ```javascript
   fileLog({ value: data, debug: true });
   ```

2. **Handle Large Objects**
   ```javascript
   fileLog({ value: bigObject, clean: true });
   ```

3. **Structured Logging**
   ```javascript
   fileLog({
       name: 'structured_log',
       value: data,
       stringify: true,
       ext: 'json'
   });
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a [Pull Request](https://github.com/Akv2021/FileLogger/pulls)

## 📄 License

MIT License - feel free to use and modify for your projects.

## 🙋‍♂️ Support

For issues and feature requests, please [create an issue](https://github.com/Akv2021/FileLogger/issues)
