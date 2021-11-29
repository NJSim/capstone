import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deletePost, editPost, getAllPosts, addComment, getPost, editComment, deleteComment, addLike, deleteLike } from "../../store/posts";
import "./SinglePost.css"
import { useParams } from "react-router";


function SinglePost({ post }) {

    // if (!post){
    //     const { postId } = useParams()
    // }
    const { postId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const currentPost = useSelector(state => state.posts.post)

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [newCaption, setNewCaption] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newEditComment, setNewEditComment] = useState("");
    const [sessionUserId, setSessionUserId] = useState("")

    // useEffect(async () => {
    //     if (!post){
    //         await dispatch(getPost(postId))
    //     }

    // },[])

    // useEffect(async () => {
    //     await dispatch(getPost(post.id))
    // },[dispatch])

    useEffect(async () => {
        setNewCaption(post.caption)
    },[dispatch, post.caption])

    useEffect(async () => {
        setSessionUserId(sessionUser.id)
    },[dispatch, sessionUser])



    const submitEdit = async (e) => {
        e.preventDefault();
        await dispatch(editPost(post.id, newCaption))
        await dispatch(getPost(post.id))
        await dispatch(getAllPosts())
    }

    const submitDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePost(post.id))
        await dispatch(getPost(post.id))
        await dispatch(getAllPosts())
    }

    const submitComment = async(e) => {
        e.preventDefault();
        const data = await dispatch(addComment(sessionUser.id, post.id, newComment))
        if (data) {
            setErrors(data)
        }
        setNewComment('')
        await dispatch(getPost(post.id))
        await dispatch(getAllPosts())
    }

    const EditComment = async (e) => {
        console.log('edit test')
    }
    const DeleteComment = async (e) => {
        console.log('delete test')

    }

    let isPost = (
        <>
            test
        </>
    )

    if (post) {
        isPost = (
        <div className="mainPost">
            <div className="postInfo">
                <NavLink to ={`/users/${post.user_id}`}>{post.user_id.username}</NavLink>
            </div>
            {post.url ? (
                <img className="postPic" src={post.url}></img>

            ): null}
            <div className="postNav">
                {post.likes[sessionUserId] ?

                <button
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(deleteLike(sessionUser.id, post.id)).then(() =>
                    dispatch(getAllPosts())
                    )
                }}>
                    Unlike
                </button>


                :
                <button
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(addLike(sessionUser.id, post.id)).then(() =>
                    dispatch(getAllPosts())
                    )

                }}
                >
                    Like
                </button>

                }


                <div>
                    Comment
                </div>
            </div>
            <div> { post.likesLength } Likes</div>
            <div><NavLink to ={`/users/${post.user_id}`}>{post.user_id.username}</NavLink> {post.caption}</div>
            {sessionUser.id == post.user_id.id ? (
            <div className="exclusive">
                <input
                onChange={(e) => setNewCaption(e.target.value)}

                value={newCaption}
                />
                <button
                onClick={submitEdit}
                >EDIT</button>
                <button
                onClick={(e) => {
                    e.preventDefault();
                    console.log('delete test')
                    dispatch(deletePost(post.id)).then(() =>
                    dispatch(getAllPosts())
                    )
                }}
                >DELETE</button>

            </div>): null}
            <div>
                <NavLink to={`/posts/${post?.id}`}>View all {post.commentsLength} comments</NavLink>

            </div>
            {Object.keys(post.comments).map( (key, index) => (
                <>
                    <h2 key={post.comments[key].id}>{post.comments[key].caption}</h2>

                    {post.comments[key].id.user_id}
                    {sessionUser.id == post.comments[key].user_id ? (
                    <div className="exclusive">
                        <input
                        onChange={(e) => setNewEditComment(e.target.value)}
                        value={newEditComment}
                        placeholder={post.comments[key].caption}
                        >
                        </input>
                        <button
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(editComment(post.id, post.comments[key].id, newEditComment)).then(() =>
                            dispatch(getPost(post.id)).then (() =>
                            dispatch(getAllPosts())
                            )
                            )
                            setNewEditComment("")
                        }}
                        >Edit Comment</button>
                        <button
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(deleteComment(post.id, post.comments[key].id)).then(() =>
                            dispatch(getPost(post.id)).then (() =>
                            dispatch(getAllPosts())
                            )
                            )
                        }}
                        >Delete Comment</button>

                    </div>

                        ): null
                    }
                </>
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

        </div>
        )
    }
    else if (currentPost){
        isPost = (
            <div className="mainPost">
            <img className="postPic" src="https://compass-ssl.xbox.com/assets/b9/0a/b90ad58f-9950-44a7-87fa-1ee8f0b6a90e.jpg?n=XSX_Page-Hero-0_768x792.jpg"></img>
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
            <NavLink to={`/posts/${post?.id}`}>View all 5 comments</NavLink>
            <div className="commentSection">
                {Object.keys(post.comments).slice(0,5).map( (key, index) => (
                    <>
                        <h2 key={post.comments[key].id}>{post.comments[key].caption}</h2>
                        <button
                        onClick={EditComment}
                        >Edit Comment</button>
                        <button
                        onClick={DeleteComment}
                        >Delete Comment</button>
                    </>
                ))}

            </div>
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

        </div>
        )
    } else {
        <>
        test2
        </>
    }


    return (
        <>
        {isPost}
        </>
    )
}

export default SinglePost
