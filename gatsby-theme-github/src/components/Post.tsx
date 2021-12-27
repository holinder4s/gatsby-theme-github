import React from "react"

const PostDate = data => {
    console.log(data)
    const isOneDay = true
    return (
        <>
            <time dateTime=''></time>
            {!isOneDay && <>6878</>}
        </>
    )
}

const Post = ({ name, id, location, url, startDate, endDate }) => (
    <div>
        <h2>
            {name} ({location})
        </h2>
        <p>
            <PostDate startDate={startDate} endDate={endDate} />
        </p>
        <p>
            Website: <a href={url}>{url}</a> {id}
        </p>
    </div>
)

export default Post