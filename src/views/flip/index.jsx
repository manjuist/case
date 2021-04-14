import React from 'react';
import { put } from 'redux-saga/effects'
import { connect } from 'react-redux'

class FLIP extends React.Component {
    state = {
        list: [1]
    }

    componentDidMount(){
        this.updateItemInfo()
        put({ type: 'SHOW_MORE_HOME' })
    }

    listRef = React.createRef()

    updateItemInfo = () => {
        const { listRef } = this
        const listItem = listRef.current.children
        Array.isArray(listItem)
    }

    render(){
        const { list } = this.state
        return (
            <div ref={this.listRef}>
                {
                    list.map((cur, ind) => (
                        <div key={ind}>
                            <div>{cur}</div>
                            <div>del</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(() => ({}), dispatch => ({ dispatch }))(FLIP)
