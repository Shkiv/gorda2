const sqlite3 = require('sqlite3')

class Interval {
    static initDb() {
        const db = Interval.#db
        db.run("CREATE TABLE IF NOT EXISTS intervals (uid TEXT, start_time INTEGER, stop_time INTEGER)")
        db.close()
    }

    static get #db() {
        return new sqlite3.Database('gorda2.db')
    }

    start() {
        if (this.startTime === undefined) {
            this.startTime = Date.now()

            const db = Interval.#db
            this.uid = require('uid').uid()
            db.serialize(() => {
                const stmt = db.prepare("INSERT INTO intervals (uid, start_time) VALUES ($uid, $time)")
                stmt.run({
                    $uid: this.uid,
                    $time: this.startTime
                })
                stmt.finalize()
            })
            db.close()

            console.log("Interval started!")
        }
    }

    stop() {
        if (this.stopTime === undefined) {
            this.stopTime = Date.now()

            const db = Interval.#db
            db.serialize(() => {
                const stmt = db.prepare("UPDATE intervals SET stop_time = $time WHERE uid = $uid")
                stmt.run({
                    $uid: this.uid,
                    $time: this.stopTime
                })
                stmt.finalize()
            })
            db.close()

            console.log("Interval stopped!")
        }
    }

    static updateAll() {
        const db = Interval.#db
        db.all("SELECT * FROM intervals", (err, rows) => {
            this.all = rows
        })
        db.close()
    }
}

module.exports = Interval