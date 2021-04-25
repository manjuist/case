/**
 * name: index.js
 * author: Deve
 * date: 2021-04-25
 */

function getElementRect(element) {
    return element.getBoundingClientRect();
}

function getCanvasPoint(
    canvas,
    point,
) {
    const [x, y] = point;
    const { x: canvasX, y: canvasY } = getElementRect(canvas);
    return [x - canvasX, y - canvasY];
}

export { getCanvasPoint };
export default { getCanvasPoint }
