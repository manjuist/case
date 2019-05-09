import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Sider, Header, Content } = Layout

function Root({ header, sider, content }) {
    return (
        <Layout>
            <Header>{header}</Header>
            <Layout>
                <Sider>{sider}</Sider>
                <Content>{content}</Content>
            </Layout>
        </Layout>
    )
}

Root.propTypes = { 
    header: PropTypes.node.isRequired,
    sider: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
}

export default Root
