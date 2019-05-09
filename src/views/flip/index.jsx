import React from 'react';

class FLIP extends React.Component {
    listRef = React.createRef()

    state = {
        list: [1]
    }

    componentDidMount(){
        this.updateItemInfo()
    }

    updateItemInfo = () => {
        const { listRef } = this
        const listItem = listRef.current.children
        console.log(listItem)
    }

    render(){
        const { list } = this.state
        return (
            <div ref={this.listRef}>
                {
                    list.map(
                        (cur, ind) => (
                            <div key={ind}>
                                <div>{cur}</div>
                                <div>del</div>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default FLIP
