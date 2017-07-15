import React from 'react';
import './footer.scss';

export default function Footer({...otherProps}) {
    return (
        <footer className="footer">
            <div className="footer__inner max-width-container">
                <p className="footer__inner__copyright">
                    &copy; Luke Boyle 93' til infinity
                </p>
                <p className="footer__inner__twitter">
                    <a href="https://www.linkedin.com/in/luke-boyle">
                        Luke Boyle on LinkedIn
                    </a>
                </p>
            </div>
        </footer>
    );
}