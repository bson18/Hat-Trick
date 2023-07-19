import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetPostComments } from "../../../store/comment"

const PostComments = ({ post }) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.comments.allComments)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetPostComments(post.id))
    }, [dispatch, post.id])

    if (!comments || comments.length === 0) return null
    console.log("postcomments", comments)


    return (
        <div>
            {Object.values(comments).reverse().map(comment => (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>Posted by: {comment.first_name} {comment.last_name}</p>
                </div>
            ))}
        </div>
    )
}

export default PostComments
