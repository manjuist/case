import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class Index extends PureComponent{
    static propTypes={
        text: PropTypes.string.isRequired,
        hehe: PropTypes.func.isRequired,
    }

    click = () => {
        const { hehe } = this.props
        hehe('ccc')
    }

    render(){
        const { text } = this.props
        const { click } = this
        return (
            <div>
                <div>index</div>
                <div>{text}</div>
                <Button
                    onClick={click}
                >change
                </Button>
            </div>
        )
    }
}

export default Index
