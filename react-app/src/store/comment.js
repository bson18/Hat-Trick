const GET_POST_COMMENTS = 'comments/GET_POST_COMMENTS'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

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

//Update comment
export const actionUpdateComment = comment => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

//Delete comment
export const actionDeleteComment = commentId => {
    return {
        type: DELETE_COMMENT,
        commentId
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

//Update comment
export const thunkUpdateComment = (commentId, comment) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(actionUpdateComment(data))
        return data
    }
}

//Delete comment
export const thunkDeleteComment = commentId => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}/delete`, {
        method: 'POST'
    })

    const data = await res.json()
    if (res.ok) {
        dispatch(actionDeleteComment(commentId))
    }
    return data
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
        case UPDATE_COMMENT: {
            newState = { ...state, [action.comment.id]: action.comment }
            return newState
        }
        case DELETE_COMMENT: {
            newState = { ...state }
            delete newState[action.commentId]
            return newState
        }

        default:
            return state
    }
}
