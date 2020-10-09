import React from 'react';
import TestContext from 'views/context'

class TestSub extends React.Component {
    componentDidMount(){
        console.log(this.context)
        throw new Error('1')
    }
    render(){
        return (
            <React.Fragment>
                <div>555555555</div>
                <TestContext.Consumer>
                    {v => v }
                </TestContext.Consumer>
            </React.Fragment>
        )
    }
}

TestSub.contextType = TestContext

export default TestSub;
