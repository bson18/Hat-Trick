import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllPosts } from "../../../store/post"

const PostTiles = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    return (
        <div className="posts">
            {posts && posts.map(post => (
                <PostTile key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostTiles
