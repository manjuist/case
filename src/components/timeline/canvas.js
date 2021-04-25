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
        this.ratio = window.devicePixelRatio;
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
        const { createCanvas, ratio } = this;
        const [{ width }] = container.getClientRects();
        const canvas = createCanvas();

        canvas.style.width = `${width}px`;
        canvas.style.height = '200px';
        canvas.width = width * ratio;
        canvas.height = 200 * ratio;

        if (container && canvas){
            container.appendChild(canvas);
        }
    }
}

export default Canvas
