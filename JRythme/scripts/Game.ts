import Conductor from "./Conductor.js";
import Graphics from "./Graphics.js";
import ParseOsu from "./ParseOsu.js";
import beatmap from "./beatmap.js";
import Note from "./Note.js";
import Music from "../Music.js";

export default class Game {
    map = new ParseOsu(beatmap);
    conductor = new Conductor(this.map.parseBPM(), this.map.parseOffset());
    graphic = new Graphics(document.querySelector("#game") as HTMLCanvasElement);
    notes = this.map.parseNotes();
    //music: Music;
    FRAME_MIN_TIME = 1/60*1000;
    music: HTMLAudioElement = new Audio("medias/audio.ogg");
    lastFrame = -1000;


    comboCount = 0;

    getNextViewNotes(): {[key: number]: Note} {
        let currentNotes = Object.keys(this.notes).map(key => parseInt(key)).sort((a, b) => { return a - b});
        let newNotes = {};

        let currentNoteIndex = 0;
        let currentNote = currentNotes[currentNoteIndex];
        while (currentNote < this.conductor.songPosition + (this.conductor.crotchet * 2)) {
            if (currentNote < this.conductor.songPosition - this.conductor.crotchet / 2) {
                delete this.notes[currentNote];
            }
            else {
                newNotes[currentNote] = this.notes[currentNote];
            }
            currentNoteIndex++;
            currentNote = currentNotes[currentNoteIndex];
        }
        return newNotes;
    }

    draw(frame: number): void {
        if (frame - this.lastFrame >= this.FRAME_MIN_TIME) {
            this.lastFrame = frame;
            this.graphic.new_frame(this.getNextViewNotes(), this.music.currentTime * 1000, this.conductor.crotchet);
        }
        if (!this.music.ended)
            requestAnimationFrame(this.draw);
    }

    start(): void {
        this.music.play().then(
            () => {
                console.log(this.lastFrame);
                this.draw(performance.now());
            },
            () => {
                alert("ouai");
            }
        )
    }

}