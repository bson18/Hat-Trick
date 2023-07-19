import { useHistory } from "react-router-dom"
const PostTile = ({ post }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`${post.id}`)
    }

    const firstSectionHeading = post.sections.length > 0 ? post.sections[0].section_heading : "";

    return (
        <div>
            <div className="post-tile" onClick={onClick}>
                {"put image here"}
                <div>{post.title}</div>
                <div>{firstSectionHeading}</div>
                <div>
                    <p><span>{post.created_at} change to time since posted</span><span>show number of comments here</span></p>
                </div>
            </div>
        </div>
    )
}

export default PostTile
