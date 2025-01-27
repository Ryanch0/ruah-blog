import { useParams } from "react-router"

const PostPage = () => {
    const {title} = useParams()
    return <>{title}</>
}

export default PostPage