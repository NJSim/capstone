import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getPost } from "../../store/posts";

const Post = () => {
    const { postId } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getPost(postId))
        })();

    },[dispatch, postId])

    return (
        <>
        Create new post {postId}
        </>
    )
}

export default Post
