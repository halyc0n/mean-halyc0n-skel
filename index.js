'use strict';

var server = require('./server'),
    app = server.app,
    port = server.port,
    debug = require('debug')('app');

app.listen(port);

debug('Server started at ' + port + ' port.');
debug(app.settings.env + ' environment.');
