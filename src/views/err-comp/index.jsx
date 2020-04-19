import React from 'react';
import PropTypes from 'prop-types';

class ErrComp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            err: false
        }
    }
    componentDidCache(err){
        if (err){
            this.setState({
                err: true
            })
        }
    }
    render(){
        const { err } = this.state;
        const { children } = this.props;
        if (err){
            return 'err'
        }
        return children
    }
}

ErrComp.propTypes = {
    children: PropTypes.node.isRequired
}

export default ErrComp;
