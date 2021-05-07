/**
 * name: scale.js
 * author: Deve
 * date: 2021-04-29
 */
import ICanvas from './canvas';
import Layout from './layout';

let dividerWidth = 100;
// const currentYear = 2021;
// const currentMonth = 4;
// const currentDay = 31;
// const currentHour = 20;

const timeType = 'h';
const timeTypeMap = {
    h: {
        name: 'h', value: 12, next: 'd', pre: '', max: 24, min: 6,
    },
    d: {
        name: 'd', value: 15, next: 'm', pre: 'h', max: 31, min: 7,
    },
    m: {
        name: 'm', value: 6, next: '', pre: 'd', max: 12, min: 3,
    },
}
const time = timeTypeMap[timeType];

const myCanvas = ICanvas.getInstance();

class Scale {
    constructor({ context, config }){
        const layout = new Layout(config);

        this.context = context;
        this.config = config;
        this.layout = layout;
        this.ratio = window.devicePixelRatio;
        this.startPoint = layout.getStartPoint(0, config.scaleHeight);
    }

    handleWheel = (deltaY) => {
        // 滚轮方向决定刻度增减
        if (deltaY > 0){
            dividerWidth -= 10;
        }
        if (deltaY < 0){
            dividerWidth += 10;
        }
    }

    drawScale=(deltaY, wheelPoint = [0, 0]) => {
        const line = (i, layout, scaleHeight, xp) => {
            myCanvas.drawLine(...layout.getStartPoint(xp, 20), ...layout.getStartPoint(xp, scaleHeight));
        }
        const {
            config: { scaleHeight },
            context: { canvas: { width } },
            ratio,
            layout,
            context,
            startPoint,
            handleWheel,
        } = this;
        const initPoint = layout.getStartPoint(0, scaleHeight);
        const wheelPointX = (wheelPoint[0] * ratio);
        const countDivider = (wheelPointX - startPoint[0]) / dividerWidth;

        myCanvas.clearup(0, 0, undefined, scaleHeight + 30);
        myCanvas.drawLine(...initPoint, ...layout.getStartPoint(width, scaleHeight));

        handleWheel(deltaY);

        let axisX = 0;

        if (countDivider > 0){
            axisX = wheelPointX - (countDivider * dividerWidth);
        }
        this.startPoint[0] = axisX;

        console.log(countDivider, wheelPoint, startPoint, axisX);

        for (let i = 0, len = time.max; i <= len; i++) {
            const xp = (i * dividerWidth) + axisX;

            line(i, layout, scaleHeight, xp);

            context.font = '24px monospace';
            context.textAlign = 'left';
            context.fillText(`${i}${timeType}`, ...layout.getStartPoint(xp, 36), 30);
        }
    }
}

export default Scale;
