const DB = require('./db.js')
const EventEmitter = require('node:events')
const Interval = require('./interval.js')

class Intervals {
    constructor() {
        this.emitter = new EventEmitter()
        const db = new DB()
        db.run("CREATE TABLE IF NOT EXISTS intervals (uid TEXT, start_time INTEGER, stop_time INTEGER, is_active INTEGER)")
        db.close()
    }

    startActive() {
        this.activeInterval = new Interval()
        this.emitter.emit('active-interval-updated')
    }

    stopActive() {
        this.activeInterval.stop()
        this.activeInterval = null
        this.emitter.emit('active-interval-updated')
    }

    updateToday() {
        const db = new DB()
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

module.exports = Intervals