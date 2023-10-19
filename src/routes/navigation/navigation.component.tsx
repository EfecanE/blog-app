import React from 'react';
import { Layout, Menu } from 'antd';
import { SIDEBAR_ITEMS } from '../../constants/sidebar-items';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

const Navigation = () => {

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={SIDEBAR_ITEMS} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, height: '100vh' }}>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Navigation;
