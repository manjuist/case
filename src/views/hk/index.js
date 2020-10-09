/**
 * name: 模块功能
 * author: Deve
 * date: 2020-09-27
 */
import React, { useEffect, useState } from 'react'

function Hk(){
    const [a, kk] = useState(0)
    useEffect(() => {
        console.log('hk1')
        return () => {
            console.log('hk2')
        }
    })
    return (
        <div
            role="button"
            onKeyUp={() => {}}
            tabIndex={-1}
            onClick={() => { kk(a + 1) }}
        >laotie{a} 
        </div>
    )
}

export default Hk
