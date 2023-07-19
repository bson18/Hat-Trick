const GET_POST_COMMENTS = 'comments/GET_POST_COMMENTS'

/*-----ACTIONS-----*/

//Get comments
export const actionGetPostComments = comments => {
    return {
        type: GET_POST_COMMENTS,
        comments
    }
}

/*-----THUNKS-----*/

//Get comments
export const thunkGetPostComments = postId => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/comments`)

    if (res.ok) {
        const data = await res.json()
        dispatch(actionGetPostComments(data))
        return data
    }
}


/*-----REDUCER-----*/

const initialState = {
    allComments: {},
    singleComment: {}
}
export default function commentsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_POST_COMMENTS: {
            newState = { ...state, allComments: action.comments }
            return newState
        }

        default:
            return state
    }
}
