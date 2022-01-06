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

    // const EditComment = async (e) => {
    //     console.log('edit test')
    // }
    // const DeleteComment = async (e) => {
    //     console.log('delete test')
    // }

    let isPost = (
        <>
            test
        </>
    )

    if (post) {
        const like=(
            <div className="unlike">
                <i class="far fa-heart"></i>

            </div>
        )
        const unlike=(
            <div className="like">
                <i class="far fa-heart"></i>

            </div>
        )
        isPost = (
        <div className="mainPost">
            <div className="postInfo">
                <NavLink className="postUser" to={`/users/${post.user_id.username}`}>{post.user_id.username}</NavLink>
            </div>
            {post.url ? (
                <img className="postPic" src={post.url}></img>

            ): null}
            <div className="postNav">
                {post.likes[sessionUserId] ?

                <div
                className="likeBtns"
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(deleteLike(sessionUser.id, post.id)).then(() =>
                    dispatch(getAllPosts())
                    )
                }}>
                    {unlike}
                </div>


                :
                <div
                className="likeBtns"
                onClick={(e) => {
                    e.preventDefault()
                    dispatch(addLike(sessionUser.id, post.id)).then(() =>
                    dispatch(getPost(post.id)).then(() =>
                    dispatch(getAllPosts()))
                    )

                }}
                >
                    {like}
                </div>

                }


                <div>
                <NavLink className="commentBtn" to={`/posts/${post?.id}`}>Comment</NavLink>
                </div>
            </div>
            <div className="numLikes"> { post.likesLength } likes</div>
            <div className="captionFlex">

                <div className="postCaption"><NavLink className="postName" to ={`/users/${post.user_id.username}`}>{post.user_id.username}</NavLink> {post.caption}</div>

                {sessionUser.id == post.user_id.id ? (
                <div className="exclusive">
                    <input
                    className="editPostInput"
                    onChange={(e) => setNewCaption(e.target.value)}
                    maxLength='500'

                    value={newCaption}
                    />
                    <div className="flexBtns">
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

                    </div>

                </div>): null}

            </div>

            <div>
                <NavLink className="viewCom" to={`/posts/${post?.id}`}>View all {post.commentsLength} comments on Post Page</NavLink>

            </div>
            {Object.keys(post.comments).map( (key, index) => (
                <div className="commentFlex">
                    <div className="comment" key={post.comments[key].id}>
                        {post.comments[key].user_id.username}
                        <div></div>
                        {post.comments[key].caption}

                    </div>

                    {post.comments[key].id.user_id}
                    {sessionUser.id == post.comments[key].user_id.id ? (
                    <div className="exclusive">
                        <input
                        maxLength='500'
                        onChange={(e) => setNewEditComment(e.target.value)}
                        value={newEditComment}
                        placeholder={post.comments[key].caption}
                        >
                        </input>
                        <div className="flexBtns">
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

                    </div>

                        ): null
                    }
                </div>
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
                    maxLength='500'
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
                test

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
