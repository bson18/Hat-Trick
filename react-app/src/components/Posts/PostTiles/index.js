import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetAllPosts } from "../../../store/post"
import PostTile from "./../PostTile"
import "./PostTiles.css"

const PostTiles = () => {
    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.allPosts)

    useEffect(() => {
        dispatch(thunkGetAllPosts())
    }, [dispatch])

    if (!posts) return null
    // console.log(posts)

    return (
        <div className="posts">
            {posts && Object.values(posts).reverse().map((post, index, array) => (
                <PostTile key={post.id} post={post} isFirstTile={index === 0} />
            ))}
        </div>
    )
}

export default PostTiles
