import React,{Component,PropTypes}                   from 'react';
import ReactDOM,{render}                             from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default (children) => (
      <Layout>
        <div>
            {children}
        </div>
      </Layout>
)
