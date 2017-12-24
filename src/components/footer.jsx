import React from 'react';

export default function Footer({...otherProps}) {
    return (
        <footer className="footer">
            <div className="footer__inner max-width-container">
                <small className="footer__inner__copyright">
                    &copy; Luke Boyle 93' til infinity
                </small>
                <a href="https://www.linkedin.com/in/luke-boyle">
                    Luke Boyle on LinkedIn
                </a>
            </div>
        </footer>
    );
}