import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/PostList"

const HomeTemplate = () => {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                    }
                }
            }
        }
    `)
    const posts = data.allMarkdownRemark.nodes
    return (
        <Layout>
            <PostList posts={posts} />
        </Layout>
    )
}

export default HomeTemplate