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
    music: Music;
    //music: HTMLAudioElement = new Audio("medias/audio.ogg");

    comboCount = 0;

    getNextViewNotes(): {[key: number]: Note} {
        let currentNotes = Object.keys(this.notes).map(key => parseInt(key)).sort((a, b) => { return a - b});
        let newNotes = {};

        let currentNote = Math.min(...currentNotes);
        while (currentNote < this.conductor.songPosition + this.conductor.crotchet * 2) {
            if (currentNote < this.conductor.songPosition - this.conductor.crotchet / 2) {
                delete this.notes[currentNote];
            }
            else {
                newNotes[currentNote] = this.notes[currentNote];
            }
        }
        return newNotes;
    }

    draw(): void {
        this.graphic.new_frame(this.getNextViewNotes(), this.music.currentTime(), this.conductor.crotchet);
    }

    start(): void {
        this.music = new Music(102780);
        while (!this.music.isEnded()) {
            this.draw();
        }
    }

}