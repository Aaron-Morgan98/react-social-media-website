import "../styles/footer.css";
import {Link} from "react-router-dom";

export const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="footer">
                <p>{new Date().getFullYear()}  Aaron Morgan - Built with React & Firebase</p>
            </div>
            <div className="footerContact">
                <Link to="/contact">Contact Me</Link>
            </div>
        </div>
    );
};
