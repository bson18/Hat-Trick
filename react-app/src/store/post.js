const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'

/*-----ACTIONS-----*/

//Get all posts
export const actionGetAllPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
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


/*-----REDUCER-----*/
const initialState = {
    allPosts: {},
    singlePost: {}
}

export default function postsReducer(state = initialState, action) {
    // let newState
    switch (action.type) {
        case GET_ALL_POSTS: {
            return {
                ...state,
                allPosts: action.posts,
            };
        }

        default:
            return state
    }
}
