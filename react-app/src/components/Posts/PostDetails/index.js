import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetSinglePost } from "../../../store/post"
import OpenModalButton from "../../OpenModalButton"
import DeletePostModal from "../DeletePostModal"
import PostComments from "../../Comments/PostComments"
import CreateComment from "../../Comments/CreateComment"

const PostDetails = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.posts.singlePost)
    const user = useSelector(state => state.session.user)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(thunkGetSinglePost(postId))
            .then(() => setIsLoading(false))
    }, [dispatch, postId])

    if (!post) return null

    if (isLoading) return <div></div>

    const showButtons = user && user.id === post.owner_id

    return (
        post && <div>
            <div>
                <h2>{post.title}</h2>
                <p>{post.owner_first_name} {post.owner_last_name}</p>
                {showButtons && <button
                    onClick={e => {
                        history.push(`/${post.id}/edit`)
                    }}
                >Edit Article</button>}
                {showButtons && (<OpenModalButton
                    modalComponent={<DeletePostModal postId={post.id} />}
                    buttonText='Delete Article'
                />)}
                <div>{post.sections.map(section => (
                    <div key={section.id}>
                        <img src={section.image} alt='' />
                        <p>{section.section_heading}</p>
                        <p>{section.section}</p>
                    </div>
                ))}</div>
                <div>
                    <CreateComment post={post} />
                </div>
                <div>
                    <PostComments post={post} />
                </div>
            </div>
        </div>
    )
}

export default PostDetails
