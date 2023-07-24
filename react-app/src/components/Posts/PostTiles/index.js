import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllPosts } from "../../../store/post"
import PostTile from "./../PostTile"
import "./PostTiles.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const PostTiles = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    if (!posts) return null

    const firstPost = Object.values(posts).reverse()[0]
    // console.log(firstPost)

    if (!firstPost) return null

    const onClick = () => {
        history.push(`${firstPost.id}`)
    }

    const timeSinceCreated = () => {
        const postCreatedAt = new Date(firstPost.created_at)
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

    const commentCount = firstPost.comments ? firstPost.comments.length : 0

    const firstSectionHeading = firstPost.sections.length > 0 ? firstPost.sections[0].section_heading : "";

    // console.log(posts)

    return (
        <div className="posts">
            <div>
                <div className="first-tile">
                    <div className="post-details">
                        <div className="post-title" onClick={onClick}>{firstPost.title}</div>
                        <div className="post-heading" onClick={onClick}>{firstSectionHeading}</div>
                        <div className="post-time-comments">
                            <p><span><i className="fa-regular fa-clock"></i> {timeSinceCreated()} </span>
                                {commentCount > 0 && (
                                    <span> <i class="fa-regular fa-comments"></i> {commentCount}</span>
                                )}
                            </p>
                        </div>
                    </div>
                    <img src={firstPost.sections[0].image} className="first-image" alt='first section image' onClick={onClick} />
                </div>
                <hr id='home-bar' />
            </div>
            <div className="small-tiles">
                {posts && Object.values(posts).slice(0, -1).reverse().map((post) => (
                    <PostTile key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default PostTiles
