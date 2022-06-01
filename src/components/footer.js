import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';
import githubLogo from '../media/githubLogo.svg';
import twitterLogo from '../media/twitterLogo.svg';

const Footer = () => {
    return(
        <footer className="footer">
            <a href="#"><img src={twitterLogo} className="footer-logo" alt="twitter logo" style={{left: "50px"}}/></a>
            <a href="https://github.com/NikOneZ1/Blockword"><img src={githubLogo} alt="github logo" className='footer-logo' style={{left: "150px"}}/></a>
            <img src={blockwordWhiteLogo} alt="logo" className='blockword-logo-footer'/>
            <a href="mailto:nikita.verba18052004@gmail.com"><p style={{right: "50px"}} className='footer-text'>Contact us</p></a>
            <a href="https://nikone.notion.site/Lightpaper-ea59c0859ded4337bde4203b8445e1a3"><p style={{right: "246px"}} className='footer-text'>Lightpaper</p></a>
        </footer>
    )
}

export default Footer;
