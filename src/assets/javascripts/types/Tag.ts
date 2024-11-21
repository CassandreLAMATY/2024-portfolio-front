export type Tag = {
    category: string;
    icon: string;
    text: string;
    color?: string;
};

export type TagsByCategory = {
    category: string;
    tags: Tag[];
};
