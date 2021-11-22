import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPost } from "../../store/posts";
import SinglePost from "../SinglePost/SinglePost";

const Post = () => {
    const { postId } = useParams()
    const currentPost = useSelector(state => state.posts.post) || {}
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getPost(postId))
        })();

    },[dispatch, postId])

    return (
        <>
            <SinglePost post={currentPost}/>
        </>
    )
}

export default Post
