import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function DrawingBoard(){
    const [count, setCount] = useState(0)
    return ReactDOM.createPortal(
        (
            <div>
                <div> drawing-board </div>
                <canvas />
                {count}
                <button onClick={() => { setCount(pre => (pre + 1)) }}>AAA</button>
            </div>
        ), document.getElementById('por')
    )
}

export default DrawingBoard
