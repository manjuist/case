import React, { PureComponent } from 'react'
import { get } from '../../ajaxServer'

class Index extends PureComponent{
    componentDidMount(){
        get({ url: '/info/list' })
        get({ url: '/info/email' })
    }
    render(){
        return <div>index</div>
    }
}

export default Index
