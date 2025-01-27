import matter from 'gray-matter';

type MenuItem = {
    key: string;
    label: string;
    children: {
        key: string;
        label: string;
    }[];
};

const getMenuItems = async (): Promise<MenuItem[]> => {
    const files = import.meta.glob("/posts/**/*.md", {
        query: "?raw",
        import: "default",
    });

    const groupedByCategory: Record<string, Array<{ fileName: string; title: string; path: string }>> = {};

    for (const [path, loader] of Object.entries(files)) {
        const content = await loader();
        const { data } = matter(content as string);
        const pathParts = path.split("/");
        
        const category = pathParts.length > 3 
            ? pathParts[2] 
            : "Others";

        const fileName = pathParts.slice(-1)[0].replace(".md", "");
        
        if (!groupedByCategory[category]) {
            groupedByCategory[category] = [];
        }

        const title = data.title || fileName;

        groupedByCategory[category].push({
            fileName,
            title,
            path
        });
    }

    const items: MenuItem[] = [];
    
    for (const [category, files] of Object.entries(groupedByCategory)) {
        const menuItem: MenuItem = {
            key: category,
            label: category,
            children: []
        };

        for (const file of files) {
            menuItem.children.push({
                key: file.fileName,
                label: file.title
            });
        }

        items.push(menuItem);
    }

    return items;
};

export default getMenuItems;
