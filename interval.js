const sqlite3 = require('sqlite3')
const EventEmitter = require('node:events')

class Interval {
    static emitter = new EventEmitter()

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

    static updateToday() {
        const db = Interval.#db
        const date = new Date()
        db.all("SELECT * FROM intervals WHERE start_time > $today AND start_time <= $tomorrow", {
            $today: date.setHours(0, 0, 0, 0),
            $tomorrow: date.setHours(23, 59, 59, 999),
        }, (_error, rows) => {
            this.today = rows
            this.emitter.emit('intervals-updated')
        })
        db.close()
    }
}

module.exports = Interval