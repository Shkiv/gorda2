class Index {
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
    }
}

const index = new Index()