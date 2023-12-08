import Note from "./Note.js";
export default class ParseOsu {
    constructor(fileContent) {
        this.file = { general: "", timingPoints: "", hitObjects: "" };
        let splitFile = fileContent.split("[Editor]");
        this.file.general = splitFile[0];
        splitFile = splitFile[1].split("[TimingPoints]")[1].split("HitObjects");
        this.file.timingPoints = splitFile[0];
        this.file.hitObjects = splitFile[1];
    }
    parseBPM() {
        return 1 / parseFloat(this.file.timingPoints.split(",")[1]) * 1000 * 60;
    }
    parseOffset() {
        return parseFloat(this.file.timingPoints.split(",")[0]);
    }
    parseNotes() {
        let lines = this.file.hitObjects.split("\n");
        let notes = {};
        for (let line of lines) {
            let properties = line.split(",");
            let hitsound = (parseInt(properties[4]) >>> 0).toString(2);
            notes[parseFloat(properties[2])] = new Note((hitsound[0] == "1") ? "blue" : "red", (hitsound[1] == "1") ? "big" : "small");
        }
        return notes;
    }
}
