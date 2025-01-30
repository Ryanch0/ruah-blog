import useFetchMdContent from "@/hooks/useFetchMdContent"
import renderHeading from "@/utils/renderHeading"
import Markdown from "react-markdown";
import { useParams, useSearchParams } from "react-router"
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type ExtraProps = {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  };

const PostPage = () => {
    const { title } = useParams()
    const [searchParams] = useSearchParams()
    const category = searchParams.get('category') as string
    const { content } = useFetchMdContent({ category, title })

    return (
        <div>
            <Markdown
                components={{
                    h1: ({ children }) => renderHeading({ children, headingNo: 1 }),
                    h2: ({ children }) => renderHeading({ children, headingNo: 2 }),
                    h3: ({ children }) => renderHeading({ children, headingNo: 3 }),
                    code({ inline, className, children, ...props }: ExtraProps) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={materialDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export default PostPage