export default class Process {
    constructor(number, cycles) {
        this._number = number;
        this._cycles = cycles;
    }

    get number() {
        return this._number;
    }

    get cycles() {
        return this._cycles;
    }

    set cycles(newVal) {
        this._cycles = newVal;
    }
}