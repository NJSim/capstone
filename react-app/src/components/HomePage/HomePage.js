import "./HomePage.css"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts, addPost } from "../../store/posts"
import * as sessionActions from '../../store/session'
import LoginForm from "../auth/LoginForm"
import Feed from "../Feed/Feed"
import Modal from "../Modal/Modal"
import NavBar from "../NavBar/NavBar"
import { Link, NavLink } from "react-router-dom"
import test from './test.png';

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
                    <img src={test} alt="test"></img>
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
                    <Link className="social" to={{pathname: "https://github.com/NJSim"}} target="_blank">Nicolas Github</Link>
                    <Link className="social" to={{pathname: "https://www.linkedin.com/in/nicolas-sim-156422170/"}} target="_blank">Nicolas LinkedIn</Link>

                </div>
                <div className="parody">© 2021 Gamestagram (parody)</div>
            </div>

        </div>
    )
    if (sessionUser) {
        isRegistered = (
            <>
                <NavBar />
                <form className="formPost" onSubmit={submitPost}>
                    <div>
                        {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div>
                        <label className="create">Create New Post</label>
                        <input
                        type='text'
                        name='caption'
                        onChange={(e) => setNewCaption(e.target.value)}
                        required
                        placeholder="Caption"
                        value={newCaption}
                        required={true}
                        maxLength='500'
                        />
                        <input
                        type='text'
                        name='url'
                        onChange={(e) => setNewURL(e.target.value)}
                        placeholder="URL"
                        value={newURL}
                        maxLength='2000'
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
