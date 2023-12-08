import Note from "./Note.js";

export default class Graphics {
    drawingCanvas: HTMLCanvasElement;
    drawingCtx: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.drawingCanvas = canvas;
        this.drawingCtx = this.drawingCanvas.getContext("2d");
        this.width = canvas.scrollWidth;
        this.height = canvas.scrollHeight;
    }

    relative_to_pixel(x: number) {
        return this.width*x;
    }

    new_frame(notes: {[key: number]: Note}, songPosition: number, crotchet: number) {
        let keys = Object.keys(notes).sort((a, b) => { return parseFloat(a) - parseFloat(b); });

        console.log(this.width);
        console.log(this.relative_to_pixel(0.02));

        this.drawingCtx.fillStyle = "black";
        this.drawingCtx.fillRect(this.relative_to_pixel(0.195), 0, this.relative_to_pixel(0.005), this.height);
        this.drawingCtx.beginPath();
        this.drawingCtx.ellipse(this.relative_to_pixel(0.195), this.height/2, this.height*0.2, this.height*0.2, 0, 0, 360);
        this.drawingCtx.stroke();
        this.drawingCtx.beginPath();
        this.drawingCtx.ellipse(this.relative_to_pixel(0.195), this.height/2, this.height*0.3, this.height*0.3, 0, 0, 360);
        this.drawingCtx.stroke();

        for (let note in notes) {
            const normalizedPos = (parseFloat(note) - songPosition)/(crotchet*2);
            console.log(normalizedPos);
            const radius = (notes[note].size == "small") ? this.height*0.2 : this.height*0.3;
            this.drawingCtx.fillStyle = notes[note].type;
            this.drawingCtx.beginPath();
            this.drawingCtx.ellipse(this.relative_to_pixel(normalizedPos), this.height/2, radius, radius, 0, 0, 360);
            this.drawingCtx.fill();
        }
    }
}