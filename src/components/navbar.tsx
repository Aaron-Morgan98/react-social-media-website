import "../styles/navbar.css";
import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const userSignOut = async () => {
        await signOut(auth);
    };

    return (
        <div className="navbar">
            <div className="navbarLinks">
                <Link to="/">Home</Link>
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <Link to="/createpost">Create Post</Link>
                )}
                <Link to="contact">Contact</Link>
            </div>

            <div className="navTitle">
                <h1> Social Space. </h1>
            </div>

              <div className="userInfo">
              {!user ? (
                    <a href="/login">Log in to view content</a>
                ) : (
                    <>
                    <p>{user?.displayName}</p>
                    <img src={user?.photoURL || ""} width="30" height="30" alt="user-avatar" />
                    <button className="logoutButton" onClick={userSignOut}> Log Out </button>
                </>
                )}
            </div>

           
        </div>
    );
};    