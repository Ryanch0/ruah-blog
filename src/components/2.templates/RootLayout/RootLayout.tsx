import CustomMenu from "@/components/0.atoms/CustomMenu/CustomMenu"
import getMenuItems from "@/components/0.atoms/CustomMenu/getMenuItems"
import CustomLayout from "@/components/1.molcules/CustomLayout/CustomLayout"
import { Outlet, useLoaderData } from "react-router"


const RootLayout = () => {    
    const items = useLoaderData()
    return <CustomLayout
        headerNode={<>롸그</>}
        leftSiderNode={<CustomMenu items={items} />}
        rightSiderNode={<>여기엔 TOC</>}
    ><Outlet />
    </CustomLayout>


}

export default RootLayout

export const loader = async () => {
    const items = await getMenuItems()
    return items
}