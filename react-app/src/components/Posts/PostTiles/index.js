import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllPosts } from "../../../store/post"
import PostTile from "./../PostTile"

const PostTiles = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    if (!posts) return null
    console.log(posts)

    return (
        <div className="posts">
            {posts && Object.values(posts).map(post => (
                <PostTile key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostTiles
