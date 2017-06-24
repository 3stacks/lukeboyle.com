import React from 'react';
import './footer.scss';

export default function Footer({...otherProps}) {
    return (
        <footer className="footer">
            <div className="footer--inner">
                <p className="footer--inner--copyright">
                    &copy; Luke Boyle <?php echo date('Y'); ?>
                </p>
                <p className="footer--inner--twitter">
                    <a href="https://twitter.com/tricepidemic" title="Find me on Twitter">
                        @tricepidemic
                    </a>
                </p>
            </div>
        </footer>
    );
}