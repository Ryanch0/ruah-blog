import useFetchMdContent from "@/hooks/useFetchMdContent"
import { useLocation } from "react-router";
import { HashLink as Link } from "react-router-hash-link";
import styles from './TOC.module.scss'

type TOCType = {
    title: string
    category: string
}

const TOC = ({ title, category }: TOCType) => {
    const { headings } = useFetchMdContent({ category, title })
    console.log(headings)
    const location = useLocation()
    return (
        <ul className={styles.list_layout}>
            {headings.map((heading, index) => (
                <li
                    className={styles.list}
                    style={{ marginLeft: (heading.level - 1) * 10 }}
                    key={index}>
                    <Link
                        to={`${location.pathname}${location.search}#${heading.id}`}
                    >{heading.text}</Link>
                </li>
            ))}
        </ul>
    )
}

export default TOC