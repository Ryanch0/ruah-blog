import { Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { PropsWithChildren, ReactNode } from "react"
import styles from './CustomLayout.module.scss'

type CustomLayoutType = {
    headerNode: ReactNode
    leftSiderNode?: ReactNode
    rightSiderNode?: ReactNode
}

const CustomLayout = ({ headerNode, leftSiderNode, children, rightSiderNode }: PropsWithChildren<CustomLayoutType>) => {
    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>{headerNode}</Header>
            <Layout>
                <Sider className={styles.left_sider} width="20%">
                    {leftSiderNode}
                </Sider>
                <Content className={styles.content}>{children}</Content>
                <Sider className={styles.right_sider} width="25%">
                    {rightSiderNode}
                </Sider>
            </Layout>
        </Layout>
    )
}

export default CustomLayout