export default class Queue {
    constructor(generator) {
        this._generator = generator;
        this._start = null;
        this._end = null;
        this._emptyQueueCycles = 0;
        this._completedProcesses = 0;
        this._cyclesLeft = 0;
        this._processesLeft = 0;
        this._totalCycles = 0;
        this._atributesString = "";
    }

    get atributesString() {
        return this._atributesString;
    }

    startQueue() {
        this._startQueue();
    }

    _startQueue() {
        for (let i = 1; i <= 300; i++) {
            let newProcess = this._generator.checkForNewProcesses();
            if(newProcess != null) {
                this._totalCycles++;
                this._positionateInQueue(newProcess);
            }
            if(this._start != null) {
                this._start.cycles = this._start.cycles-1;
                console.log(`No. de ciclo: ${i}. No. de proceso: ${this._start.number}. Ciclos restantes: ${this._start.cycles}`);
                if(this._start.cycles == 0) {
                    this._completedProcesses++;
                    this._deleteFinishedProcess();
                }
            } else {
                console.log(`No. de ciclo: ${i}. Ciclo sin procesos.`);
                this._emptyQueueCycles++;
            }
            /*console.log("NUEVO");
            console.log(newProcess);
            console.log("Inicio");
            console.log(this._start);
            console.log("---------------------");*/ 
        }
        this._getAtributesAsString();
    }

    _getAtributesAsString() {
        this._getCyclesAndProcessesLeft();
        this._atributesString = 
        `Ciclos con lista vacía: ${this._emptyQueueCycles}` + "\n" + 
        `Procesos totales: ${this._totalCycles}` + "\n" +
        `Procesos pendientes: ${this._processesLeft}` + "\n" +
        `Ciclos pendientes: ${this._cyclesLeft}` + "\n" + 
        `Procesos atendidos: ${this._completedProcesses}`;
    }

    _getCyclesAndProcessesLeft() {
        let start = this._start;
        while(start != null) {
            this._processesLeft++;
            this._cyclesLeft += start.cycles;
            start = start.next;
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