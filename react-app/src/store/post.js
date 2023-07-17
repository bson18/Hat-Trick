const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const GET_SINGLE_POST = 'posts/GET_SINGLE_POST'
const CREATE_POST = '/posts/CREATE_POST'

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


/*-----REDUCER-----*/
const initialState = {
    allPosts: {},
    singlePost: {}
}

export default function postsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_POSTS: {
            return {
                ...state,
                allPosts: action.posts,
            };
        }
        case GET_SINGLE_POST: {
            newState = { ...state.allPosts, singlePost: {} }
            newState.singlePost = action.post
            return newState
        }

        default:
            return state
    }
}
