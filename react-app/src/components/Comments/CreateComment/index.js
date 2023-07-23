import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkCreateComment, thunkGetPostComments } from "../../../store/comment"
import { thunkGetSinglePost } from "../../../store/post"
import './CreateComment.css'

const CreateComment = ({ post }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [comment, setComment] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        const errors = {}

        if (!comment) errors.comment = 'Comment is required'
        setValidationErrors(errors)
    }, [comment])

    const onSubmit = async e => {
        e.preventDefault()
        setHasSubmitted(true)

        if (!comment) return

        const createComment = { comment }

        if (Object.keys(validationErrors).length > 0) return

        const createdComment = await dispatch(thunkCreateComment(createComment, post.id))

        if (createdComment) {
            dispatch(thunkGetPostComments(post.id))
                .then(() => dispatch(thunkGetSinglePost(post.id)))
                .then(() => {
                    setComment("")
                    setHasSubmitted(false)
                })
        }
    }
    if (user) {
        return (
            <div>
                <form className="comment-form" onSubmit={onSubmit}>
                    <textarea
                        className="comment-textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Join the discussion..."
                    />

                    <button type="submit">SUBMIT</button> {validationErrors.comment && hasSubmitted && (
                        <span>{validationErrors.comment}</span>
                    )}
                </form>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default CreateComment
