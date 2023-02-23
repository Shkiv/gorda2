const sqlite3 = require('sqlite3')

class DB {
    db = null

    static get instance() {
        if (this.db == null) this.db = new sqlite3.Database('gorda2.db')
        return this.db
    }

    static close() {
        this.instance.close()
    }
}

module.exports = DB