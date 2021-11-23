import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deletePost, editPost, getAllPosts, addComment, getPost } from "../../store/posts";
import "./SinglePost.css"


function SinglePost({ post }) {

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [newCaption, setNewCaption] = useState("");
    const [newComment, setNewComment] = useState("");

    useEffect(async () => {
        await dispatch(getPost(post.id))
    },[])

    useEffect(async () => {
        setNewCaption(post.caption)
    },[dispatch, post.caption])

    const submitEdit = async (e) => {
        e.preventDefault();
        await dispatch(editPost(post.id, newCaption))
        await dispatch(getAllPosts())
        await dispatch(getPost(post.id))
    }

    const submitDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePost(post.id))
        await dispatch(getAllPosts())
        await dispatch(getPost(post.id))
    }

    const submitComment = async(e) => {
        e.preventDefault();
        const data = await dispatch(addComment(sessionUser.id, post.id, newComment))
        if (data) {
            setErrors(data)
        }
        setNewComment('')
        await dispatch(getAllPosts())
    }

    let isPost = (
        <>
            test
        </>
    )

    if (post) {
        isPost = (
        <>
            <img className="postPic" src="https://www.cnet.com/a/img/resize/556a4835fe1f5e881f754ef2a7b131fd5d7fcb37/hub/2014/11/25/1a6274da-c2ae-404e-9b91-6f0195c5bec9/nintendo-wii-u-product-photos-add-01.jpg?auto=webp&fit=crop&height=675&width=1200"></img>
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
            <NavLink to={`/posts/${post.id}`}>View all {5} comments</NavLink>
            {Object.keys(post.comments).map( (key, index) => (
                <h2 key={post.comments[key].id}>{post.comments[key].caption}</h2>
            ))}
            <form onSubmit={submitComment}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                    type='text'
                    name='comment'
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    placeholder="Add a comment..."
                    value={newComment}
                    required={true}
                    ></input>
                    <button type="submit">Post</button>
                </div>

            </form>
            <br></br>

        </>
        )
    }


    return (
        <>
        {isPost}
        </>
    )
}

export default SinglePost
