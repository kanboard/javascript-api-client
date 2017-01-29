Javascript API Client for Kanboard
==================================

[![Build Status](https://travis-ci.org/kanboard/javascript-api-client.svg?branch=master)](https://travis-ci.org/kanboard/javascript-api-client)

[Kanboard](https://kanboard.net/) is a Kanban project management software.

- Author: Frédéric Guillot
- License: MIT

Requirements
------------

- Tested with nodejs >= 7.3.x

Installation
------------

```bash
npm install kanboard
```

Examples
--------

Methods and arguments are the same as the API procedures described in the [official documentation](https://kanboard.net/documentation/api-json-rpc).

### Get list of projects

```javascript
const Kanboard = require('kanboard');

var kb = new Kanboard('http://localhost/jsonrpc.php', 'username', 'password');

kb.execute('getMyProjects')
.on('success', (result) => {
    console.log(result);
})
.on('error', (error) => {
    console.log(error);
});
```

### Create a new project

```javascript
kb.execute('getMyProjects', {name: 'My project'});
```

### Create a new task

```javascript
kb.execute('createTask', {title: 'My task', project_id: 3, color_id: 'blue'});
```
