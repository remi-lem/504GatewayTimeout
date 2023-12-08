export default class Note {
    constructor(type, size) {
        this.type = type;
        this.size = size;
    }
    getType() {
        return this.type;
    }
    getSize() {
        return this.size;
    }
}
