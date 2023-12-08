export default class Conductor {
    bpm: number;
    crotchet: number;
    offset: number;
    songPosition: number;
    lastBeat: number;

    constructor(bpm, offset)  {
        this.bpm = bpm;
        this.crotchet = 60 / this.bpm;
        this.offset = offset;
        this.lastBeat = 0;
        this.songPosition = 0;
    }

    getSongPosition(): number {
        return this.songPosition;
    }
}