import Note from "./Note.js";

export default class ParseOsu {
    file = { general: "", timingPoints: "", hitObjects: ""};

    constructor(fileContent: string) {
        let splitFile = fileContent.split("[Editor]");
        this.file.general = splitFile[0];
        splitFile = splitFile[1].split("[TimingPoints]")[1].split("HitObjects");
        this.file.timingPoints = splitFile[0];
        this.file.hitObjects = splitFile[1];
    }

    parseBPM(): number {
        return 1 / parseFloat(this.file.timingPoints.split(",")[1]) * 1000 * 60;
    }

    parseOffset(): number {
        return parseFloat(this.file.timingPoints.split(",")[0]);
    }

    parseNotes(): {[key: number]: Note} {
        let lines = this.file.hitObjects.split("\n");
        let notes: {[key: number]: Note} = {};
        for (let line of lines) {
            let properties = line.split(",");
            let hitsound = (parseInt(properties[3]) >>> 0).toString(2);
            notes[parseFloat(properties[2])] = new Note((hitsound[0] == "1") ? "blue" : "red",
                (hitsound[1] == "1") ? "big" : "small");
        }
        return notes;
    }

}