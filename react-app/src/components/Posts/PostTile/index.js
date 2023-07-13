import { useHistory } from "react-router-dom"
const PostTile = ({ post }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`${post.id}`)
    }

    return (
        <div>
            <div className="post-tile" onClick={onClick}>
                {"put image here"}
                <div>{post.title}</div>
                <div>{post.heading}</div>
                <div>
                    <p><span>{post.created_at} change to time since posted</span><span>show number of comments here</span></p>
                </div>
            </div>
        </div>
    )
}

export default PostTile
