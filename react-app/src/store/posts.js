const LOAD_POST = "posts/LOAD_POST";
const LOAD_ALL_POST = "posts/LOAD_ALL_POST";

const setPost = post => ({
    type: LOAD_POST,
    payload: post
});

const setAllPosts = allPosts => ({
    type: LOAD_ALL_POST,
    payload: allPosts
});

const initialState = {
    post: null,
    allPosts: null
}

export const getPost = postId => async dispatch => {
    const response = await fetch(`/api/posts/${postId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setPost(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const getAllPosts = () => async dispatch => {
    const response = await fetch(`api/posts/`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setAllPosts(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_POST:
            return { ...state, post: action.payload };
        case LOAD_ALL_POST:
            return { ...state, allPosts: action.payload };
        default:
            return state;
    }
}
