class MainView {
    constructor() {
        let startButton = document.createElement("button")
        startButton.textContent = "Start"
        startButton.addEventListener('click', () => {
            window.electronAPI.startInterval()
        })
        document.body.appendChild(startButton)

        let stopButton = document.createElement("button")
        stopButton.textContent = "Stop"
        stopButton.addEventListener('click', () => {
            window.electronAPI.stopInterval()
        })
        document.body.appendChild(stopButton)

        let activeIntervalTable = document.createElement("table")
        activeIntervalTable.id = "activeIntervalTable"
        document.body.appendChild(activeIntervalTable)
        window.electronAPI.updateActiveInterval()

        let intervalTable = document.createElement("table")
        intervalTable.id = "intervalTable"
        document.body.appendChild(intervalTable)
        window.electronAPI.updateIntervals()
    }

    update(intervals) {
        let intervalTable = document.createElement("table")
        intervalTable.id = "intervalTable"
        let oldIntervalTable = document.getElementById("intervalTable")

        intervals.forEach(interval => {
            let cell = document.createElement("td")
            cell.innerHTML = "Started: " + new Date(interval.start_time).getHours() + ":" + new Date(interval.start_time).getMinutes()
                + "<br>Stopped: " + new Date(interval.stop_time).getHours() + ":" + new Date(interval.stop_time).getMinutes()
            let row = document.createElement("tr")
            row.appendChild(cell)
            intervalTable.appendChild(row)
        })

        oldIntervalTable.replaceWith(intervalTable)
    }
}

const mainView = new MainView()
onmessage = (event) => mainView.update(event.data)