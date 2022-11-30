class Index {
    constructor() {
        let startButton = document.createElement("button")
        startButton.textContent = "Start"
        startButton.onclick = this.startInterval
        document.body.appendChild(startButton)
        
        let stopButton = document.createElement("button")
        stopButton.textContent = "Stop"
        stopButton.onclick = this.stopInterval
        document.body.appendChild(stopButton)
    }
    
    startInterval() {
        console.log("Interval started!")
    }

    stopInterval() {
        console.log("Interval stopped!")
    }
}

const index = new Index()