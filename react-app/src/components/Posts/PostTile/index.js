import { useHistory } from "react-router-dom"
const PostTile = ({ post, isFirstTile }) => {
    const history = useHistory()

    const onClick = () => {
        history.push(`${post.id}`)
    }

    const timeSinceCreated = () => {
        const postCreatedAt = new Date(post.created_at)
        const currentTime = new Date()
        const timeDiff = Math.abs(currentTime - postCreatedAt) / 1000

        const hours = Math.floor(timeDiff / 3600)
        const mins = Math.floor(timeDiff / 60)

        if (hours >= 24) {
            const options = { month: "short", day: "numeric", year: "numeric" }
            return postCreatedAt.toLocaleDateString(undefined, options)
        } else if (hours >= 1) {
            return `${hours}h`
        } else {
            return `${mins}m`
        }
    }

    const commentCount = post.comments ? post.comments.length : 0

    const firstSectionHeading = post.sections.length > 0 ? post.sections[0].section_heading : "";

    if (isFirstTile) {
        return (
            <div>
                <div className="first-tile" onClick={onClick}>
                    <div className="post-details">
                        <div className="post-title">{post.title}</div>
                        <div className="post-heading">{firstSectionHeading}</div>
                        <div className="post-time-comments">
                            <p><span><i className="fa-regular fa-clock"></i> {timeSinceCreated()} </span>
                                {commentCount > 0 && (
                                    <span> <i class="fa-regular fa-comments"></i> {commentCount}</span>
                                )}
                            </p>
                        </div>
                    </div>
                    <img src={post.sections[0].image} className="first-image" alt='first section image' />
                </div>
                <hr id='home-bar' />
            </div>
        )
    }

    return (
        <div className="post">
            <div className="post-tile" onClick={onClick}>
                <div className="image-container">
                    <img src={post.sections[0].image} className="image" alt='first section image' />
                </div>
                <div>{post.title}</div>
                <div>{firstSectionHeading}</div>
                <div>
                    <p><span><i className="fa-regular fa-clock"></i> {timeSinceCreated()} </span>
                        {commentCount > 0 && (
                            <span> <i class="fa-regular fa-comments"></i> {commentCount}</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PostTile
