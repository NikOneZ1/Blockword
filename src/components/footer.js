import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';
import githubLogo from '../media/githubLogo.svg';
import twitterLogo from '../media/twitterLogo.svg';

const Footer = () => {
    return(
        <footer className="footer">
            <img src={twitterLogo} className="footer-logo" alt="twitter logo" style={{left: "50px"}}/>
            <img src={githubLogo} alt="github logo" className='footer-logo' style={{left: "150px"}}/>
            <img src={blockwordWhiteLogo} alt="logo" className='blockword-logo-footer'/>
            <p style={{right: "50px"}} className='footer-text'>Contact us</p>
            <p style={{right: "246px"}} className='footer-text'>Lightpaper</p>
        </footer>
    )
}

export default Footer;
