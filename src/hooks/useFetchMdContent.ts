import { useEffect, useState } from "react";
import matter from "gray-matter";
import { useNavigate } from "react-router";

interface FetchMdContentProps {
    category: string;
    title?: string;
}

type HeadingType = {
    text: string;
    id: string;
    level: number;
}

const useFetchMdContent = ({ category, title }: FetchMdContentProps) => {
    const [content, setContent] = useState<string>("");
    const [headings, setHeadings] = useState<HeadingType[]>([]);
    const navigate = useNavigate();
    const fileName = `${category}/${title}`;

    useEffect(() => {
        const fetchContent = async () => {
            if (!fileName) {
                navigate("/");
                return;
            }

            const fileModules = import.meta.glob("/posts/**/*.md", {
                query: "?raw",
                import: "default",
            });
            
            const filePath = `/posts/${fileName}.md`;

            if (!fileModules[filePath]) {
                console.error(`File not found: ${filePath}`);
                navigate("/");
                return;
            }

            try {
                const content = await fileModules[filePath]();
                const { content: mdContent } = matter(content as string);
                
                if (!mdContent) {
                    throw new Error("Empty markdown content");
                }

                // 헤딩 추출 로직 추가
                const headingRegex = /^(?!#\s)(#{1,5})\s+(.*)$/gm;
                const matches = [...mdContent.matchAll(headingRegex)];
                
                const extractedHeadings = matches.map((match) => ({
                    text: match[2],
                    id: match[2].toLowerCase().replace(/\s+/g, "-"),
                    level: match[1].length,
                }));

                setContent(mdContent);
                setHeadings(extractedHeadings);
            } catch (error) {
                console.error("Error fetching markdown content:", error);
                navigate("/");
            }
        };

        fetchContent();
    }, [fileName, navigate]);

    return { content, headings };
};

export default useFetchMdContent;
