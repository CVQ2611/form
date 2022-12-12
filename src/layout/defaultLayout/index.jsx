import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import HeaderMenu from "../../components/headerMenu";
import { headerButton, styleContent, styleHeader } from "../../constant";

const { Header, Content } = Layout;
function Defaulayout() {

    return (
        <Layout>
            <Header style={styleHeader}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    items={headerButton.map((button) => {
                        return {
                            label: <HeaderMenu button={button} />
                        };
                    })}
                    style={{ width: '100%' }}
                />
            </Header>
            <Content style={styleContent}>
                <Outlet />
            </Content>
        </Layout>
    )
}

export default Defaulayout;