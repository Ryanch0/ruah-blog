import { Menu } from "antd"
import { useNavigate } from "react-router"
import styles from './CustomMenu.module.scss'

export type MenuType = {
    items: {
        key: string,
        label: string,
        children: { key: string, label: string }[]
    }[]
    mode?: 'vertical' | 'horizontal' | 'inline'
    className?: string
}

const CustomMenu = ({ items, mode = 'inline', className }: MenuType) => {
    const navigate = useNavigate()
    return <Menu
        items={items}
        mode={mode}
        className={`${styles.custom} ${className}`}
        onClick={(info) => {
            const category = info.keyPath[1]
            navigate(`${info.key}?category=${category}`)
        }
        } />
}

export default CustomMenu