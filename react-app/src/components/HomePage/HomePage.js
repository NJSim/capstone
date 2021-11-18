import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as sessionActions from '../../store/session'
import Feed from "../Feed/Feed"

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const demo = (e) => {
        e.preventDefault();
        setEmail("demo@aa.io");
        setPassword("password");
        return dispatch(sessionActions.login("demo@aa.io", "password"))

    }

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
