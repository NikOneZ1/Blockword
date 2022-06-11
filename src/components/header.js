import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';

const Header = () => {
    return(
        <header className="header">
            <img src={blockwordWhiteLogo} alt="logo" className='blockword-logo-header'/>
            <a href="https://nikone.notion.site/Lightpaper-ea59c0859ded4337bde4203b8445e1a3"><p style={{top: "50%", left: "5%", transform: "translate(-0%, -50%)"}} className='header-text'>Lightpaper</p></a>
            <a>
                <button className="header-button" style={{top: "50%", right: "5%", transform: "translate(-0%, -50%)"}}>Open app</button>
            </a>
        </header>
    )
}

export default Header;
