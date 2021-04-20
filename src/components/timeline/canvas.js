/**
 * name: canvas.js
 * author: Deve
 * date: 2021-04-19
 */

class Canvas {
    constructor(){
        this.container = null;
        this.canvas = null;
        this.context = null;
    }

    createCanvas=() => {
        const { canvas } = this;

        if (canvas) return canvas

        this.canvas = document.createElement('canvas');
        return this.canvas;
    }

    getContext=() => {
        const { context, createCanvas } = this;

        if (context) return context;

        const canvas = createCanvas();
        this.context = canvas.getContext('2d');
        return this.context;
    }

    init=(container) => {
        const { createCanvas } = this;
        const [{ width }] = container.getClientRects();
        const canvas = createCanvas();

        canvas.width = width;
        canvas.height = 200;

        if (container && canvas){
            container.appendChild(canvas);
        }
    }
}

export default Canvas
