import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteComment, thunkGetPostComments } from "../../../store/comment"
import { useModal } from "../../../context/Modal"

const DeleteComment = ({ commentId }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const post = useSelector(state => state.posts.singlePost)

    const deleteComment = async () => {
        const deleted = await dispatch(thunkDeleteComment(commentId))

        if (deleted) {
            dispatch(thunkGetPostComments(post.id))
                .then(closeModal)
        }
    }

    return (
        <div className="confirm-modal">
            <h2 className="delete-head">CONFIRM COMMENT DELETE</h2>
            <p>Are you sure you want to delete this comment?</p>
            <div className="button-container">
                <button className="confirm-button" onClick={deleteComment}>YES (Delete Comment)</button>
                <button className="reject-button" onClick={closeModal}>NO (Keep Comment)</button>
            </div>
        </div>
    )
}

export default DeleteComment
