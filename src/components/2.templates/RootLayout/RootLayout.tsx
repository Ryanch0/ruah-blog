import CustomMenu from "@/components/0.atoms/CustomMenu/CustomMenu"
import getMenuItems from "@/components/0.atoms/CustomMenu/getMenuItems"
import TOC from "@/components/0.atoms/TOC/TOC"
import CustomLayout from "@/components/1.molcules/CustomLayout/CustomLayout"
import { Outlet, useLoaderData, useParams, useSearchParams } from "react-router"

const RootLayout = () => {
    const items = useLoaderData()
    const { title } = useParams()
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category') as string

    if (title && category) {
        return <CustomLayout
            headerNode={<>롸그</>}
            leftSiderNode={<CustomMenu items={items} />}
            rightSiderNode={<TOC title={title} category={category} />}
        >
            <Outlet />
        </CustomLayout>
    }

    return <CustomLayout
        headerNode={<>롸그</>}
        leftSiderNode={<CustomMenu items={items} />}
    >
        <Outlet />
    </CustomLayout>


}

export default RootLayout

export const loader = async () => {
    const items = await getMenuItems()
    return items
}