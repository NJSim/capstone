import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllPosts } from "../../store/posts"

import Post from "../Post/Post"
import SinglePost from "../SinglePost/SinglePost"
import "./Feed.css"

const Feed = () => {
    const sessionUser = useSelector(state => state.session.user)
    const allPosts = useSelector(state => state.posts.allPosts) || {}
    const dispatch = useDispatch();

    useEffect(async() => {
        await dispatch(getAllPosts())

    },[])

    return (
        <div className="mainFeed">
            <div className="feedFlex">
                {Object.keys(allPosts).map((key, index) => (
                    <>

                        {/* <h2 key={allPosts[key].id}>{allPosts[key].caption}</h2>
                        <button>edit</button>
                        <button>delete</button> */}
                        <SinglePost key={allPosts[key].id} post={allPosts[key]}/>

                    </>
                ))}

            </div>
            <div className="userInfo">
                <div>
                    {sessionUser.username}

                </div>
                <div>
                    {sessionUser.bio}

                </div>
                <div>
                    <NavLink className="userProfile" to={`/users/${sessionUser.username}`}>Profile</NavLink>

                </div>



            </div>
        </div>
    )
}

export default Feed
