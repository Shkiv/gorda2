const DB = require('./db.js')
const EventEmitter = require('node:events')

class Interval {
    constructor() {
        this.emitter = new EventEmitter()
        this.type = Interval.name
        this.startTime = Date.now()

        const db = new DB()
        this.uid = require('uid').uid()
        db.serialize(() => {
            const stmt = db.prepare("INSERT INTO intervals (uid, start_time, is_active) VALUES ($uid, $time, TRUE)")
            stmt.run({
                $uid: this.uid,
                $time: this.startTime
            })
            stmt.finalize()
        })
        db.close()
    }

    stop() {
        this.stopTime = Date.now()

        const db = new DB()
        db.serialize(() => {
            const stmt = db.prepare("UPDATE intervals SET stop_time = $time, is_active = FALSE WHERE uid = $uid")
            stmt.run({
                $uid: this.uid,
                $time: this.stopTime
            })
            stmt.finalize()
            this.emitter.emit('interval-stopped')
        })
        db.close()

    }
}

module.exports = Interval