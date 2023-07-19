const GET_POST_COMMENTS = 'comments/GET_POST_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'

/*-----ACTIONS-----*/

//Get comments
export const actionGetPostComments = comments => {
    return {
        type: GET_POST_COMMENTS,
        comments
    }
}

//Create comment
export const actionCreateComment = comment => {
    return {
        type: CREATE_COMMENT,
        comment
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

//Create comment
export const thunkCreateComment = (comment, postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionCreateComment(data))
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
        case CREATE_COMMENT: {
            newState = { ...state, allComments: { ...state.allComments, [action.comment.id]: action.comment } }
            return newState
        }

        default:
            return state
    }
}
