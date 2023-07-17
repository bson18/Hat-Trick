import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { thunkGetSinglePost } from "../../../store/post"

const PostDetails = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const post = useSelector(state => state.posts.singlePost)

    useEffect(() => {
        dispatch(thunkGetSinglePost(postId))
    }, [dispatch, postId])

    if (!post) return null

    return (
        post && <div>
            <div>
                <h2>{post.title}</h2>
                <p>{post.owner_first_name} {post.owner_last_name}</p>
                <p>{post.heading}</p>
                <p>{post.post}</p>
            </div>
        </div>
    )
}

export default PostDetails
