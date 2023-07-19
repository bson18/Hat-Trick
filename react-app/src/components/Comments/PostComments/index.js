import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetPostComments } from "../../../store/comment"
import OpenModalButton from "../../OpenModalButton"
import UpdateComment from "../UpdateComment"
import DeleteComment from "../DeleteComment"

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
                    {user && user.id === comment.user_id && (
                        <div>
                            <OpenModalButton
                                modalComponent={<UpdateComment comment={comment} />}
                                buttonText="Edit"
                            />
                            <div><DeleteComment commentId={comment.id} /></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default PostComments
