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

        let intervalTable = document.createElement("table")
        intervalTable.id = "intervalTable"
        document.body.appendChild(intervalTable)
        window.electronAPI.updateIntervals()
    }

    update(message) {
        let intervalTable = document.createElement("table")
        intervalTable.id = "intervalTable"
        let oldIntervalTable = document.getElementById("intervalTable")

        message.forEach(interval => {
            let cell = document.createElement("td")
            let row = document.createElement("tr")
            cell.textContent = JSON.stringify(interval)
            row.appendChild(cell)
            intervalTable.appendChild(row)
        })

        oldIntervalTable.replaceWith(intervalTable)
    }
}

const mainView = new MainView()
onmessage = (event) => mainView.update(event.data)