import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkGetPostComments, thunkUpdateComment } from "../../../store/comment"
import { useModal } from "../../../context/Modal"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const UpdateComment = ({ comment }) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const history = useHistory()

    const [updatedComment, setUpdatedComment] = useState(comment.comment)
    const [validationErrors, setValidationErrors] = useState({})
    // const [isEditing, setIsEditing] = useState(false)

    // const editClick = () => {
    //     setIsEditing(true)
    // }

    // const cancelClick = () => {
    //     setIsEditing(false)
    //     setUpdatedComment(comment.comment)
    //     setValidationErrors(null)
    // }

    const updateComment = async e => {
        e.preventDefault()

        if (!updatedComment) {
            setValidationErrors("Comment is required")
            return
        }

        const updatedData = { comment: updatedComment }

        dispatch(thunkUpdateComment(comment.id, updatedData))
            .then(dispatch(thunkGetPostComments(comment.post_id)))
            .then(dispatch(thunkGetPostComments(comment.post_id)))
            .then(closeModal)
        // .then(history.push(`/${comment.post_id}`))
    }

    // if (isEditing) {
    //     return (
    //         <div>
    //             <form onSubmit={updateComment}>
    //                 <textarea
    //                     value={updatedComment}
    //                     onChange={(e) => setUpdatedComment(e.target.value)}
    //                 />
    //                 {validationErrors && <p>{validationErrors}</p>}
    //                 <button type="submit">Update</button>
    //                 <button type="button" onClick={cancelClick}>
    //                     Cancel
    //                 </button>
    //             </form>
    //         </div>
    //     );
    // }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Comment</h2>
                <form onSubmit={updateComment}>
                    <textarea value={updatedComment} onChange={e => setUpdatedComment(e.target.value)} />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateComment
