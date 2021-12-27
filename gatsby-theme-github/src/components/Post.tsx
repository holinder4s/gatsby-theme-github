import React, { FC } from "react"

interface Props {
    html: string
    info: {
        date: string
    }
}

const Post: FC<any> = ({ html, info }) => (
    <div>
        {info.date}
        <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
)

export default Post