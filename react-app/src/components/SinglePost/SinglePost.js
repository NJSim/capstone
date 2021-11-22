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
            <img src="https://www.cnet.com/a/img/resize/556a4835fe1f5e881f754ef2a7b131fd5d7fcb37/hub/2014/11/25/1a6274da-c2ae-404e-9b91-6f0195c5bec9/nintendo-wii-u-product-photos-add-01.jpg?auto=webp&fit=crop&height=675&width=1200"></img>
            <div className="postNav">
                <div>
                    Like Button
                </div>
                <div>
                    Comment Button
                </div>
            </div>
            <div>placeholder Likes</div>
            <div>{post.user_id}</div>
            <div>{post.caption}</div>

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
            <NavLink to={`/posts/${post.id}`}>View all {5} comments</NavLink>

        </>
    )
}

export default SinglePost
