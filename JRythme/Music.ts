export default class Music {
    startTime: number;
    endTime: number;

    constructor(duration: number) {
        this.startTime = (new Date()).getTime();
        this.endTime = this.startTime + duration;
    }

    isEnded() {
        return this.endTime < (new Date()).getTime();
    }

    currentTime() {
        return (new Date()).getTime() - this.startTime;
    }
}