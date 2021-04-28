/**
 * name: canvas.js
 * author: Deve
 * date: 2021-04-19
 */

class ICanvas {
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

    inPath=([x, y], path) => {
        const context = this.getContext()
        if (path){
            return context.isPointInPath(path, x, y)
        }
        return context.isPointInPath(x, y)
    }
}

export default ICanvas
