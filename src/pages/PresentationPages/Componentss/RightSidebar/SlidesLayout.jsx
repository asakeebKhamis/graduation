export const BlankCard = {
    slideName: 'Blank card',
    type: 'blank-card',
    className: 'p-8 mx-auto flex justify-center items-center min-h-[200px]',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            }
        ],
    },
};

export const ImageAndText = {
    slideName: 'Image and text',
    type: 'imageAndText',
    className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Image and text',
                className: 'border',
                content: [
                    {
                        id: Math.random().toString(36).substring(2),
                        type: 'column',
                        name: 'Column',
                        content: [
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'image',
                                name: 'Image',
                                className: 'p-3',
                                content: 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWd1fHx8fGVufDB8fHx8fA%3D%3D',
                                alt: 'Title',
                            },
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'heading3',
                                name: 'Heading3',
                                content: '',
                                placeholder: 'Heading 3',
                            },
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'paragraph',
                                name: 'Paragraph',
                                content: '',
                                placeholder: 'Start typing...',
                            }
                        ],
                    }
                ],
            }
        ],
    },
};

export const TextAndImage = {
    slideName: 'Text and image',
    type: 'textAndImage',
    className: 'min-h-[200px] p-8 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Text and image',
                className: 'border',
                content: [
                    {
                        id: Math.random().toString(36).substring(2),
                        type: 'column',
                        name: 'Column',
                        content: [
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'heading3',
                                name: 'Heading3',
                                content: '',
                                placeholder: 'Heading 3',
                            },
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'paragraph',
                                name: 'Paragraph',
                                content: '',
                                placeholder: 'Start typing...',
                            },
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'image',
                                name: 'Image',
                                className: 'p-3',
                                content: 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWd1fHx8fGVufDB8fHx8fA%3D%3D',
                                alt: 'Title',
                            }
                        ],
                    }
                ],
            }
        ],
    },
};

export const TwoColumns = {
    slideName: 'Two columns',
    type: 'twoColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Columns',
                className: 'border',
                content: Array.from({ length: 2 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'paragraph',
                            name: 'Paragraph',
                            content: '',
                            placeholder: 'Start typing...',
                        }
                    ],
                })),
            }
        ],
    },
};

export const ThreeColumns = {
    slideName: 'Three columns',
    type: 'threeColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Columns',
                className: 'border',
                content: Array.from({ length: 3 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'paragraph',
                            name: 'Paragraph',
                            content: '',
                            placeholder: 'Start typing...',
                        }
                    ],
                })),
            }
        ],
    },
};

export const FourColumns = {
    slideName: 'Four columns',
    type: 'fourColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Columns',
                className: 'border',
                content: Array.from({ length: 4 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'paragraph',
                            name: 'Paragraph',
                            content: '',
                            placeholder: 'Start typing...',
                        }
                    ],
                })),
            }
        ],
    },
};

export const TwoColumnsWithHeadings = {
    slideName: 'Two columns with headings',
    type: 'twoColumnsWithHeadings',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Columns',
                className: 'border',
                content: Array.from({ length: 2 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'heading3',
                            name: 'Heading',
                            content: '',
                            placeholder: 'Heading',
                        },
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'paragraph',
                            name: 'Paragraph',
                            content: '',
                            placeholder: 'Start typing...',
                        }
                    ],
                })),
            }
        ],
    },
};

export const ThreeColumnsWithHeadings = {
    slideName: 'Three columns with headings',
    type: 'threeColumnsWithHeadings',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Columns',
                className: 'border',
                content: Array.from({ length: 3 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'heading3',
                            name: 'Heading',
                            content: '',
                            placeholder: 'Heading',
                        },
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'paragraph',
                            name: 'Paragraph',
                            content: '',
                            placeholder: 'Start typing...',
                        }
                    ],
                })),
            }
        ],
    },
};

export const TwoImageColumns = {
    slideName: 'Two image columns',
    type: 'twoImageColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Image Columns',
                className: 'border',
                content: Array.from({ length: 2 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'image',
                            name: 'Image',
                            className: 'p-3',
                            content: 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWd1fHx8fGVufDB8fHx8fA%3D%3D',
                            alt: 'Image',
                        }
                    ],
                })),
            }
        ],
    },
};

export const ThreeImageColumns = {
    slideName: 'Three image columns',
    type: 'threeImageColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Image Columns',
                className: 'border',
                content: Array.from({ length: 3 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'image',
                            name: 'Image',
                            className: 'p-3',
                            content: 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWd1fHx8fGVufDB8fHx8fA%3D%3D',
                            alt: 'Image',
                        }
                    ],
                })),
            }
        ],
    },
};

export const FourImageColumns = {
    slideName: 'Four image columns',
    type: 'fourImageColumns',
    className: 'p-4 mx-auto flex justify-center items-center',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'title',
                name: 'Title',
                content: '',
                placeholder: 'Untitled Card',
            },
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Image Columns',
                className: 'border',
                content: Array.from({ length: 4 }, (_, i) => ({
                    id: Math.random().toString(36).substring(2),
                    type: 'column',
                    name: `Column ${i + 1}`,
                    content: [
                        {
                            id: Math.random().toString(36).substring(2),
                            type: 'image',
                            name: 'Image',
                            className: 'p-3',
                            content: 'https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWd1fHx8fGVufDB8fHx8fA%3D%3D',
                            alt: 'Image',
                        }
                    ],
                })),
            }
        ],
    },
};

export const AccentLeft = {
    slideName: 'Accent left',
    type: 'accentLeft',
    className: 'min-h-[300px]',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        restrictDropTo: true,
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Resizable column',
                restrictToDrop: true,
                content: [
                    {
                        id: Math.random().toString(36).substring(2),
                        type: 'column',
                        name: 'Content',
                        content: [
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'heading3',
                                name: 'Heading',
                                content: '',
                                placeholder: 'Heading',
                            },
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'paragraph',
                                name: 'Paragraph',
                                content: '',
                                placeholder: 'Start typing...',
                            }
                        ],
                    }
                ],
            }
        ],
    },
};

export const AccentRight = {
    slideName: 'Accent right',
    type: 'accentRight',
    className: 'min-h-[300px]',
    content: {
        id: Math.random().toString(36).substring(2),
        type: 'column',
        name: 'Column',
        content: [
            {
                id: Math.random().toString(36).substring(2),
                type: 'resizable-column',
                name: 'Resizable column',
                restrictToDrop: true,
                content: [
                    {
                        id: Math.random().toString(36).substring(2),
                        type: 'column',
                        name: 'Content',
                        content: [
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'heading3',
                                name: 'Heading',
                                content: '',
                                placeholder: 'Heading',
                            },
                            {
                                id: Math.random().toString(36).substring(2),
                                type: 'paragraph',
                                name: 'Paragraph',
                                content: '',
                                placeholder: 'Start typing...',
                            }
                        ],
                    }
                ],
            }
        ],
    },
};