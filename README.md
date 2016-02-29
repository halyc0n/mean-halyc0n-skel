# mean-halyc0n-skel

Skeleton application for MEAN stack (MongoDB Express AngularJS Node.js)

## Installation

```bash
$ git clone https://github.com/halyc0n/mean-halyc0n-skel
$ cd mean-halyc0n-skel
$ npm install -g node-gyp
$ npm install
$ bower install
```
In config/ folder change url for development and test database (config/development/database.js and config/test/database.js)

## Run

```bash
$ DEBUG=app nodemon
```

## Test

You must first install mocha:
```bash
$ npm install -g mocha
```

Run tests:
```bash
$ make test
```
