import React, { useState } from 'react'

function DrawingBoard(){
    const [count, setCount] = useState(0)
    return (
        <div>
            <div> drawing-board </div>
            <canvas />
            {count}
            <button onClick={() => { setCount(pre => (pre + 1)) }}>AAA</button>
        </div>
    )
}

export default DrawingBoard
