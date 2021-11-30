import { NavLink } from "react-router-dom"
import "./Forgot.css"

const Forgot = () => {
    return (
        <>
            <h1>As of this moment- we cannot reset your password. Please email simjamesnicolas@gmail.com for further inquiries</h1>
            <NavLink to="/" className="btns">Return to Splash Page</NavLink>
        </>
    )
}

export default Forgot
