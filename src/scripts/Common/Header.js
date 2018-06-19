import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header } = Layout;

const Head = () => (
  <Layout>
    <Header className="header">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <SubMenu title="列表">
          <Menu.Item key="1">
            <Link to=" " href=" ">列表</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  </Layout>
);

export default Head;
