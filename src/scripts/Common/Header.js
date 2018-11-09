import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Layout, Breadcrumb, Icon } from 'antd';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

const { Header } = Layout;

const Head = () => (
  <Layout>
    <Header className="header">HEAD</Header>
  </Layout>
);

export default Head;
