import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { thunkCreateComment, thunkGetPostComments } from "../../../store/comment"
import { thunkGetSinglePost } from "../../../store/post"

const CreateComment = ({ post }) => {
    const dispatch = useDispatch()

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

    return (
        <div>
            <form onSubmit={onSubmit}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Join the discussion..."
                />
                {validationErrors.comment && hasSubmitted && (
                    <p>{validationErrors.comment}</p>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateComment
