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

export const addPost = (user_id, caption) => async dispatch => {
    const response = await fetch('/api/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            caption
        }),
    });

    if (response.ok) {
        await response.json();
        getAllPosts();
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editPost = (id, caption) => async dispatch => {
    await fetch(`/api/posts/${id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, caption }),

    });

    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json();
    dispatch(setPost(data))

}

export const deletePost = id => async dispatch => {
    await fetch(`/api/posts/${id}/delete`, {
        method: "DELETE",
    });
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json();
    dispatch(setPost(data))
    //reminder when they delete from /posts/{id} to nea

};

export const addComment = (user_id, post_id, caption) => async dispatch => {
    const response = await fetch(`/api/posts/${post_id}/addComment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            post_id,
            caption
        }),
    });

    if (response.ok) {
        await response.json()
        getAllPosts();
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}


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
