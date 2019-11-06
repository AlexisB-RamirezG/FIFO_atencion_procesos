export default class Queue {
    constructor(generator) {
        this._generator = generator;
        this._start = null;
        this._end = null;
        this._emptyQueueCycles = 0;
        this._completedProcesses = 0;
        this._totalCyclesLeft = 0;
        this._totalProcessesLeft = 0;
    }

    startQueue() {
        this._startQueue();
    }

    _startQueue() {
        for (let i = 1; i <= 30; i++) {
            let newProcess = this._generator.checkForNewProcesses();
            if(newProcess != null) {
                this._positionateInQueue(newProcess);
            }
            if(this._start != null) {
                this._start.cycles = this._start.cycles-1;
                if(this._start.cycles == 0) {
                    this._deleteFinishedProcess();
                }
            } else {
                this._emptyQueueCycles++;
            }
            /*console.log("NUEVO");
            console.log(newProcess);
            console.log("Inicio");
            console.log(this._start);
            console.log("---------------------");*/ 
        }
    }

    _positionateInQueue(newProcess) {
        if(this._start == null) {
            this._start = newProcess;
        } else if (this._end == null) {
            this._end = newProcess;
            this._start.next = this._end;
        } else {
            this._end.next = newProcess;
            this._end = newProcess;
        }
    }

    _deleteFinishedProcess() {
        if(this._start.next == this._end) {
            this._start = this._end;
            this._end = null;
        } else if (this._end == null) {
            this._start = null;
        } else {
            this._start = this._start.next;
        }
    }
}