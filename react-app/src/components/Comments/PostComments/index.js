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

    if (!comments) return null
    console.log(comments)


    return (
        null
    )
}

export default PostComments
