import Generator from "./generator.js";
import Queue from "./queue.js";

class Main {
    constructor() {
        this._generator = new Generator();
        this._newQueue = new Queue(this._generator);
    }

    initializeQueue() {
        console.log("Hola");
        this._newQueue.startQueue();
    }
}

let m = new Main();
m.initializeQueue();

