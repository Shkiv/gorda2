const DB = require('./db.js')
const EventEmitter = require('node:events')

class Interval {
    #db = DB.instance

    constructor() {
        this.emitter = new EventEmitter()
        this.type = Interval.name
        this.startTime = Date.now()

        this.uid = require('uid').uid()
        const stmt = this.#db.prepare("INSERT INTO intervals (uid, start_time, is_active) VALUES ($uid, $time, TRUE)")
        stmt.run({
            $uid: this.uid,
            $time: this.startTime
        })
        stmt.finalize()
    }

    stop() {
        this.stopTime = Date.now()
        const stmt = this.#db.prepare("UPDATE intervals SET stop_time = $time, is_active = FALSE WHERE uid = $uid")
        stmt.run({
            $uid: this.uid,
            $time: this.stopTime
        })
        stmt.finalize()

        this.emitter.emit('interval-stopped')
    }
}

module.exports = Interval