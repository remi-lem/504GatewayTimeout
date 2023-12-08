export default class Conductor {
    constructor(bpm, offset) {
        this.bpm = bpm;
        this.crotchet = 60 / this.bpm * 1000;
        this.offset = offset;
        this.lastBeat = 0;
        this.songPosition = 0;
    }
    getSongPosition() {
        return this.songPosition;
    }
}
