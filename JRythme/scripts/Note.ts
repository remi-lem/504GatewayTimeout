export default class Note {
    type: "red" | "blue";
    size: "small" | "big";

    constructor(type: "red" | "blue", size: "small" | "big") {
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
