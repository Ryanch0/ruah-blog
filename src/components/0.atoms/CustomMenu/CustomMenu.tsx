import { Menu } from "antd"
import { useNavigate } from "react-router"

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
        className={className}
        onClick={(info) => navigate(info.key)} />
}

export default CustomMenu