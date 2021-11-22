import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deletePost, editPost, getAllPosts } from "../../store/posts";



function SinglePost({ post }) {

    const dispatch = useDispatch();
    const [newCaption, setNewCaption] = useState("");

    useEffect(async () => {
        setNewCaption(post.caption)
    },[dispatch, post.caption])

    const submitEdit = async (e) => {
        e.preventDefault();
        await dispatch(editPost(post.id, newCaption))
        await dispatch(getAllPosts())
    }

    const submitDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePost(post.id))
        await dispatch(getAllPosts())
    }

    return (
        <>
            <NavLink to={`/posts/${post.id}`}>{post.caption}</NavLink>

            <input
            onChange={(e) => setNewCaption(e.target.value)}

            value={newCaption}
            />
            <button
            onClick={submitEdit}
            >EDIT</button>
            <button
            onClick={submitDelete}>DELETE</button>
            <br></br>
        </>
    )
}

export default SinglePost
