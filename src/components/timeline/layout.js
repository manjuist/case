/**
 * name: layout.js
 * author: Deve
 * date: 2021-04-29
 */

class Layout {
    constructor(config){
        this.config = config
    }
    getStartPoint(x, y){
        const { config: { padding: [top, , , left] } } = this;
        return [x + left, y + top] 
    }
    getEndPoint(x, y){ 
        const { config: { padding: [top, , , left] } } = this;
        return [x - left, y - top]
    }
}

export default Layout
