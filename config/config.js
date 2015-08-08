var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'adminapp'
        },
        port: 4000,
        db: 'mysql://root@localhost:3306/adminapp'
    },

    test: {
        root: rootPath,
        app: {
            name: 'adminapp'
        },
        port: 3000,
        db: 'mysql://localhost/adminapp-test'
    },

    production: {
        root: rootPath,
        app: {
            name: 'adminapp'
        },
        port: 3000,
        db: 'mysql://localhost/adminapp-production'
    }
};

module.exports = config[env];