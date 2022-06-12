import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';
import githubLogo from '../media/githubLogo.svg';
import twitterLogo from '../media/twitterLogo.svg';

const Footer = () => {
    return(
        <footer className="footer">
            <a href="https://google.com" target="_blank" rel='noreferrer'><img src={twitterLogo} className="footer-logo" alt="twitter logo" style={{top: "50%", left: "5%", transform: "translate(-0%, -50%)"}}/></a>
            <a href="https://github.com/NikOneZ1/Blockword" target="_blank" rel='noreferrer'><img src={githubLogo} alt="github logo" className='footer-logo' style={{top: "50%", left: "10%", transform: "translate(-0%, -50%)"}}/></a>
            <img src={blockwordWhiteLogo} alt="logo" className='blockword-logo-footer'/>
            <a href="mailto:nikita.verba18052004@gmail.com"><p style={{top: "50%", right: "5%", transform: "translate(-0%, -50%)"}} className='footer-text'>Contact us</p></a>
            <a href="https://nikone.notion.site/Lightpaper-ea59c0859ded4337bde4203b8445e1a3" target="_blank" rel='noreferrer'><p style={{top: "50%", right: "17%", transform: "translate(-0%, -50%)"}} className='footer-text'>Lightpaper</p></a>
        </footer>
    )
}

export default Footer;
