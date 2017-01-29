Javascript API Client for Kanboard
==================================

- Author: Frédéric Guillot
- License: MIT

Requirements
------------

- Tested with nodejs >= v7.3.x

Installation
------------

```bash
npm install kanboard
```

Examples
--------

Methods and arguments are the same as the API procedures described in the [official documentation](https://kanboard.net/documentation/api-json-rpc).

```javascript
const kanboard = require('kanboard');

var kb = new kanboard.Client('http://localhost/jsonrpc.php', 'username', 'password');

kb.execute('getMyProjects')
.on('success', (result) => {
    console.log(result);
})
.on('error', (error) => {
    console.log(error);
});
```
