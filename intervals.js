const DB = require('./db.js')
const EventEmitter = require('node:events')
const Interval = require('./interval.js')
const TodayDTO = require('./dto/today.js')

class Intervals {
    constructor() {
        this.emitter = new EventEmitter()
        this.active = null
        const db = new DB()
        db.run("CREATE TABLE IF NOT EXISTS intervals (uid TEXT, start_time INTEGER, stop_time INTEGER, is_active INTEGER)")
        db.close()
    }

    startActive() {
        if (this.active == null) this.active = new Interval()
        this.emitter.emit('active-interval-updated')
    }

    stopActive() {
        if (this.active !== null) {
            this.active.emitter.on('interval-stopped', () => {
                this.updateToday()
            })
            this.active.stop()
        }
        this.active = null
        this.emitter.emit('active-interval-updated')
    }

    updateToday() {
        const db = new DB()
        const date = new Date()
        db.all("SELECT * FROM intervals WHERE start_time > $today AND start_time <= $tomorrow AND is_active != TRUE", {
            $today: date.setHours(0, 0, 0, 0),
            $tomorrow: date.setHours(23, 59, 59, 999),
        }, (_error, rows) => {
            this.today = new TodayDTO(rows)
            this.emitter.emit('intervals-updated')
        })
        db.close()
    }
}

module.exports = Intervals