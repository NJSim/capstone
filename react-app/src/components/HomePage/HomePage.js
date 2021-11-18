import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts } from "../../store/posts"
import * as sessionActions from '../../store/session'
import Feed from "../Feed/Feed"

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)
    //const allPosts = useSelector(state => state.posts.allPosts)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const demo = (e) => {
        e.preventDefault();
        setEmail("demo@aa.io");
        setPassword("password");
        return dispatch(sessionActions.login("demo@aa.io", "password"))
    }

    useEffect(() => {
        (async () => {
            await dispatch(getAllPosts())

        })();
    },[dispatch])


    let isRegistered = (
        <>
        This is the splash page
        <button className="demo-login" onMouseDown={demo}>Demo Login</button>
        </>
    )
    if (sessionUser) {
        isRegistered = (
            <>
                <Feed/>
            </>
        )
    }

    return (
        <>
            {isRegistered}
        </>
    )
}

export default HomePage
