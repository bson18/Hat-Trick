const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const GET_SINGLE_POST = 'posts/GET_SINGLE_POST'
const CREATE_POST = 'posts/CREATE_POST'
const UPDATE_POST = 'posts/UPDATE_POST'
const DELETE_POST = 'posts/DELETE_POST'

/*-----ACTIONS-----*/

//Get all posts
export const actionGetAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

//Get single post
export const actionGetSinglePost = post => {
    return {
        type: GET_SINGLE_POST,
        post
    }
}

//Create post
export const actionCreatePost = post => {
    return {
        type: CREATE_POST,
        post
    }
}

//Update post
export const actionUpdatePost = post => {
    return {
        type: UPDATE_POST,
        post
    }
}

//Delete post
export const actionDeletePost = postId => {
    return {
        type: DELETE_POST,
        postId
    }
}

/*-----THUNKS-----*/

//Get all posts
export const thunkGetAllPosts = () => async dispatch => {
    const res = await fetch('/api/posts')
    const data = await res.json()

    const normalizedData = {}
    Object.values(data.all_posts).forEach(post => {
        normalizedData[post.id] = post
    })

    dispatch(actionGetAllPosts(normalizedData))
    return data
}

//Get single post
export const thunkGetSinglePost = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`)
    const post = await res.json()
    if (res.ok) {
        dispatch(actionGetSinglePost(post))
        return post
    }
}

//Create post
export const thunkCreatePost = post => async dispatch => {
    const res = await fetch('/api/posts/new', {
        method: "POST",
        body: post
    })

    if (res.ok) {
        const data = await res.json()
        // console.log("data", data)
        dispatch(actionCreatePost(data))
        dispatch(actionGetAllPosts())
        return data
    }
}

//Update post
export const thunkUpdatePost = (postId, post) => async dispatch => {
    try {
        const res = await fetch(`/api/posts/${postId}`, {
            method: 'POST',
            body: post
        })

        if (res.ok) {
            const data = await res.json()
            // console.log("data", data)
            dispatch(actionUpdatePost(data))
            return data
        }
    } catch (error) {
        // console.log(error)
    }
}

//Delete post
export const thunkDeletePost = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/delete`, {
        method: 'POST'
    })
    const data = await res.json()
    if (res.ok) {
        dispatch(actionDeletePost(postId))
        dispatch(thunkGetAllPosts())
    }
    return data
}


/*-----REDUCER-----*/
const initialState = {
    allPosts: {},
    singlePost: {}
}

export default function postsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_POSTS: {
            newState = { ...state, allPosts: action.posts }
            return newState
        }
        case GET_SINGLE_POST: {
            newState = { ...state.allPosts, singlePost: {} }
            newState.singlePost = action.post
            return newState
        }
        case CREATE_POST: {
            newState = { ...state, allPosts: { ...state.allPosts } }
            // console.log("reducer", action.post.id)
            newState.allPosts[action.post.id] = action.post
            return newState
        }
        case UPDATE_POST: {
            newState = { ...state, [action.post.id]: action.post }
            return newState
        }
        case DELETE_POST: {
            newState = { ...state }
            delete newState[action.postId]
            return newState
        }
        default:
            return state
    }
}
