import "./HomePage.css"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts, addPost } from "../../store/posts"
import * as sessionActions from '../../store/session'
import LoginForm from "../auth/LoginForm"
import Feed from "../Feed/Feed"
import Modal from "../Modal/Modal"
import NavBar from "../NavBar/NavBar"
import { NavLink } from "react-router-dom"

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newCaption, setNewCaption] = useState("");
    const [newURL, setNewURL] = useState("")

    const dispatch = useDispatch();

    const demo = (e) => {
        e.preventDefault();
        setEmail("demo@aa.io");
        setPassword("password");
        return dispatch(sessionActions.login("demo@aa.io", "password"))
    }

    const submitPost = async (e) => {
        e.preventDefault();
        //data validation if caption is greater than 1?
        const data = await dispatch(addPost(sessionUser.id, newCaption, newURL))
        if (data) {
            setErrors(data)
        }
        setNewCaption('')
        setNewURL('')
        await dispatch(getAllPosts())
    }



    // useEffect(async() => {
    //     await dispatch(getAllPosts())

    // },[])


    let isRegistered = (
        <div className='splashPage'>
            <div className='splashFlex'>
                <div className='pictureSplash'>
                    text
                </div>
                <div className='splashMain'>
                    <div className='splashMainFlex'>
                        <div className="logForm">
                            <div className="logo">
                                <h1 className="logoFont">Gamestagram</h1>
                            </div>
                            <div className="logInForm">
                                <LoginForm/>
                                <button className="demo-login" onMouseDown={demo}>Demo Login</button>
                            </div>
                        </div>
                        <div className="signUp">
                            <span>Don't have an account? </span>
                            <NavLink className="signupLink" to="/sign-up">Sign up</NavLink>
                        </div>
                        <div className="text">
                            Coming to Apps Soon.
                        </div>

                    </div>
                </div>

            </div>

            <div className="splashFooter">
                <div className="socials">
                    <div>Nicolas Github</div>
                    <div>Nicolas LinkedIn</div>

                </div>
                <div>© 2021 Gamestagram (Instagram Clone)</div>
            </div>

        </div>
    )
    if (sessionUser) {
        isRegistered = (
            <>
                <NavBar />
                <form onSubmit={submitPost}>
                    <div>
                        {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div>
                        <label>Create New Post</label>
                        <input
                        type='text'
                        name='caption'
                        onChange={(e) => setNewCaption(e.target.value)}
                        required
                        placeholder="Create New Post"
                        value={newCaption}
                        required={true}
                        />
                        <input
                        type='text'
                        name='url'
                        onChange={(e) => setNewURL(e.target.value)}
                        placeholder="URL"
                        value={newURL}
                        >
                        </input>
                    </div>
                    <button type="submit">Create Post</button>
                </form>
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
