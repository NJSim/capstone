import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts, addPost } from "../../store/posts"
import * as sessionActions from '../../store/session'
import Feed from "../Feed/Feed"
import Modal from "../Modal/Modal"

const HomePage = () => {

    const sessionUser = useSelector(state => state.session.user)
    const [errors, setErrors] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newCaption, setNewCaption] = useState("");

    const dispatch = useDispatch();

    const demo = (e) => {
        e.preventDefault();
        setEmail("demo@aa.io");
        setPassword("password");
        return dispatch(sessionActions.login("demo@aa.io", "password"))
    }

    const submitPost = async(e) => {
        e.preventDefault();
        //data validation if caption is greater than 1?
        const data = await dispatch(addPost(sessionUser.id, newCaption))
        if (data) {
            setErrors(data)
        }
        setNewCaption('')
        await dispatch(getAllPosts())
    }



    useEffect(async() => {
        await dispatch(getAllPosts())

    },[])


    let isRegistered = (
        <>
        This is the splash page
        <button className="demo-login" onMouseDown={demo}>Demo Login</button>
        </>
    )
    if (sessionUser) {
        isRegistered = (
            <>
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
                    ></input>
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
