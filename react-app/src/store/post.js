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

    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetAllPosts(data['Posts']))
        return data
    }
}


/*-----REDUCER-----*/
const initialState = {
    allPosts: null,
    singlePost: {}
}

export default function postsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_ALL_POSTS: {
            newState = { allPosts: {}, ...state.singlePost }
            newState.allPosts = action.posts
            return newState
        }
    }
}
