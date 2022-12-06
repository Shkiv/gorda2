class Interval {
    constructor() {
        const sqlite3 = require('sqlite3').verbose()
        const db = new sqlite3.Database('gorda2.db')
        db.serialize(() => {
            db.run("CREATE TABLE IF NOT EXISTS intervals (start_time INTEGER, end_time INTEGER)")
            const stmt = db.prepare("INSERT INTO intervals (start_time) VALUES (?)")
            stmt.run(Date.now())
            stmt.finalize()
        })

        db.close()
    }
}

module.exports = Interval