import React, { FC } from "react"
import { Link } from "gatsby"

interface Props {
    posts: any[]
}

const PostList: FC<Props> = ({ posts }) => (
    <>
        <h2>Post List</h2>
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <strong>
                        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                    </strong>
                    <br />
                    {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}{' '}
                    in {post.location}
                </li>
            ))}
        </ul>
    </>
)

export default PostList