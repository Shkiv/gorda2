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
        document.body.appendChild(intervalTable)

        let intervalHead = document.createElement("thead")
        intervalTable.appendChild(intervalHead)

        let intervalBody = document.createElement("tbody")
        intervalBody.id = "intervalBody"
        intervalTable.appendChild(intervalBody)

        window.electronAPI.updateIntervals()
    }

    update(intervals) {
        let intervalBody = document.createElement("tbody")
        intervalBody.id = "intervalBody"
        let oldIntervalBody = document.getElementById("intervalBody")

        intervals.forEach(interval => {
            let cell = document.createElement("td")
            cell.innerHTML = "Started: " + new Date(interval.start_time).getHours() + ":" + new Date(interval.start_time).getMinutes()
                + "<br>Stopped: " + new Date(interval.stop_time).getHours() + ":" + new Date(interval.stop_time).getMinutes()
            let row = document.createElement("tr")
            row.appendChild(cell)
            intervalBody.appendChild(row)
        })

        oldIntervalBody.replaceWith(intervalBody)
    }
}

const mainView = new MainView()
onmessage = (event) => {
    console.log("Event: " + JSON.stringify(event.data))
    if (event.data == null) return
    if (event.data.type == "TodayDTO") mainView.update(event.data.rows)
}