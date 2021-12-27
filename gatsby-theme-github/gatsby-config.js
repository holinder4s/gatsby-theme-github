const DEFAULT_CONTENTS_PATH = 'contents'

module.exports = ({ contentsPath = DEFAULT_CONTENTS_PATH }) => ({
    siteMetadata: {
        title: `Title from siteMetadata 111`,
    },
    plugins: [
        'gatsby-plugin-typescript',
        'gatsby-plugin-styled-components',
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: contentsPath,
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                footnotes: true,
                gfm: true,
                plugins: [],
            },
        },
    ],
})
