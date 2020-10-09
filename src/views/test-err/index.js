import React from 'react';
import ErrComp from 'views/error-boundaries'
import TestSub from './TestSub'

function TestErr() {
    return (
        <ErrComp>
            <TestSub />
        </ErrComp>
    )
}

export default TestErr;
