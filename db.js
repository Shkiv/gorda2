const sqlite3 = require('sqlite3')

class DB {
    constructor() {
        return new sqlite3.Database('gorda2.db')
    }
}

module.exports = DB