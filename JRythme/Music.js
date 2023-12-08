export default class Music {
    constructor(duration) {
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
