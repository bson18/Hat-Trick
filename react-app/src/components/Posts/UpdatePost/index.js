import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

const UpdatePost = () => {
    const { postId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const post = useSelector(state => state.posts)
}
