import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts } from "../../store/posts"

import Post from "../Post/Post"
import SinglePost from "../SinglePost/SinglePost"

const Feed = () => {
    const allPosts = useSelector(state => state.posts.allPosts) || {}
    const dispatch = useDispatch();

    useEffect(async() => {
        await dispatch(getAllPosts())

    },[])

    return (
        <>
            <h1>Feed Section</h1>

            {Object.keys(allPosts).map((key, index) => (
                <>

                    {/* <h2 key={allPosts[key].id}>{allPosts[key].caption}</h2>
                    <button>edit</button>
                    <button>delete</button> */}
                    <SinglePost post={allPosts[key]}/>

                </>
            ))}
        </>
    )
}

export default Feed
