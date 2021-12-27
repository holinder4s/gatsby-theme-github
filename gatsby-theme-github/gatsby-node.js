const fs = require("fs")
const DEFAULT_BASE_PATH = '/'
const DEFAULT_CONTENTS_PATH = 'contents'

// Make sure the contents directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
    const contentsPath = options.contentsPath || DEFAULT_CONTENTS_PATH

    if(!fs.existsSync(contentsPath)) {
        reporter.info(`creating the ${contentsPath} directory`)
        fs.mkdirSync(contentsPath)
    }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({
            node,
            getNode,
            basePath: `contents`,
            trailingSlash: false,
        })

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

// Define the `Post` type
exports.createSchemaCustomization = ({ actions }) => {
    actions.createTypes(`
        type Post implements Node @dontInfer {
            id: ID!
        }
    `)
}

// Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }, options) => {
    const basePath = options.basePath || DEFAULT_BASE_PATH
    
    const slugify = str => {
        const slug = str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        return `/${basePath}/${slug}`.replace(/\/\/+/g, "/")
    }
    createResolvers({
        Query: {
            markdownRemark: {
                slug: {
                    resolve: source => slugify(source.name),
                },
            },
        },
    })
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
    const basePath = options.basePath || DEFAULT_BASE_PATH
    actions.createPage({
        path: basePath,
        component: require.resolve("./src/templates/home.tsx"),
    })

    const result = await graphql(`
        query {
            allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    `)
    if(result.errors) {
        reporter.panic("error loading posts", result.errors)
        return
    }

    const posts = result.data.allMarkdownRemark.nodes
    posts.forEach(post => {
        const slug = post.slug
        actions.createPage({
            path: slug,
            component: require.resolve("./src/templates/post.tsx"),
            context: {
                postID: post.id,
            },
        })
    })
}