import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllPosts, getPost } from "../../store/posts";
import NavBar from "../NavBar/NavBar";
import SinglePost from "../SinglePost/SinglePost";

const Post = () => {
    const { postId } = useParams()
    const currentPost = useSelector(state => state.posts.post)
    const dispatch = useDispatch();

    useEffect(async() => {
        await dispatch(getPost(postId))

    },[])

    let postExists = (
        <>
        </>
    )

    if (currentPost){
        postExists = (
            <>
            <NavBar/>
            <SinglePost post={currentPost}/>
        </>
        )
    }


    return (
        <>
            {postExists}
        </>
    )
}

export default Post
