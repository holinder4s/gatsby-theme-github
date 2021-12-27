import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Post from "../components/Post"

export const query = graphql`
    query($postID: String!) {
        markdownRemark(id: { eq: $postID }) {
            id
            html
        }
    }
`

const PostTemplate = data => {
    <Layout>
        <Post {...data.markdownRemark} />
    </Layout>
}

export default PostTemplate