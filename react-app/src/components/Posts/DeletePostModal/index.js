import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal"
import { thunkDeletePost } from "../../../store/post"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const DeletePostModal = ({ postId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const onClick = e => {
        e.preventDefault()
        dispatch(thunkDeletePost(postId))
            .then(closeModal)
            .then(history.push('/'))
    }

    return (
        <div className="confirm-modal">
            <h2 className="delete-head">CONFIRM DELETE</h2>
            <p>Are you sure you want to delete this article?</p>
            <div className="button-container">
                <button className="confirm-button" onClick={onClick}>YES (Delete Article)</button>
                <button className="reject-button" onClick={closeModal}>NO (Keep Article)</button>
            </div>
        </div>
    )
}

export default DeletePostModal
