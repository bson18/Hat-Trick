import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteComment, thunkGetPostComments } from "../../../store/comment"

const DeleteComment = ({ commentId }) => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.posts.singlePost)

    const deleteComment = async () => {
        const deleted = await dispatch(thunkDeleteComment(commentId))

        if (deleted) {
            dispatch(thunkGetPostComments(post.id))
        }
    }

    return (
        <button type='button' onClick={deleteComment}>Delete</button>
    )
}

export default DeleteComment
