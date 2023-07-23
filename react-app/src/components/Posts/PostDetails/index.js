import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetSinglePost } from "../../../store/post"
import OpenModalButton from "../../OpenModalButton"
import DeletePostModal from "../DeletePostModal"
import PostComments from "../../Comments/PostComments"
import CreateComment from "../../Comments/CreateComment"
import "./PostDetails.css"

const PostDetails = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.posts.singlePost)
    const user = useSelector(state => state.session.user)
    const [isLoading, setIsLoading] = useState(true)
    const [userLocalTime, setUserLocalTime] = useState(null)

    useEffect(() => {
        dispatch(thunkGetSinglePost(postId))
            .then(() => setIsLoading(false))
    }, [dispatch, postId])

    useEffect(() => {
        if (post) {
            const userTimeZone = new Date().getTimezoneOffset();
            const postCreatedAt = new Date(post.created_at)
            const userLocalDate = new Date(postCreatedAt.getTime() - userTimeZone * 60000)
            setUserLocalTime(formatDate(userLocalDate))
        }
    })

    const formatDate = (date) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
        return date.toLocaleDateString(undefined, options)
    }

    if (!post) return null

    if (isLoading) return <div></div>

    const showButtons = user && user.id === post.owner_id

    return (
        post && <div className="post-container">
            <h2>{post.title}</h2>
            <div className="post-info">
                <p className="info-left">{post.owner_first_name} {post.owner_last_name} {" "}
                    {showButtons && <button
                        onClick={e => {
                            history.push(`/${post.id}/edit`)
                        }}
                    >Edit Article</button>} {" "}
                    {showButtons && (<OpenModalButton
                        modalComponent={<DeletePostModal postId={post.id} />}
                        buttonText='Delete Article'
                    />)}
                </p>
                <p className="info-right">{userLocalTime} <i class="fa-regular fa-comments"></i> {post.comments.length}</p>
            </div>
            <div>
                {post.sections.map(section => (
                    <div key={section.id} className="post-sections">
                        <img src={section.image} alt='' />
                        <p className="section-text-head"><h3>{section.section_heading}</h3></p>
                        <p className="section-text">{section.section}</p>
                    </div>
                ))}
            </div>
            <div>
                <CreateComment post={post} />
            </div>
            <div>
                <PostComments post={post} />
            </div>
        </div>
    )
}

export default PostDetails
