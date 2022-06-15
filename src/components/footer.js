import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';
import githubLogo from '../media/githubLogo.svg';
import twitterLogo from '../media/twitterLogo.svg';

const Footer = () => {
    return(
        <div className='container-fluid footer mt-3' style={{padding: "0px"}}>
            <div className="p-3 d-flex flex-wrap align-items-center justify-content-beetween" style={{backgroundColor: "black"}}>
                <div className='col-md-5'>
                    <a href="https://google.com" target="_blank" rel='noreferrer'><img src={twitterLogo} alt="twitter logo" style={{width: "50px"}}/></a>
                    <a href="https://github.com/NikOneZ1/Blockword" target="_blank" rel='noreferrer'><img src={githubLogo} alt="github logo" style={{width: "50px", marginLeft: "20px"}}/></a>
                </div>
                <img src={blockwordWhiteLogo} style={{height: "70px"}} alt="Blockword" className='col-md-2'/>
                <div className='col-md-5'>
                    <a href="mailto:nikita.verba18052004@gmail.com" className='float-end text-decoration-none header-text'>Contact us</a>
                    <a href="https://nikone.notion.site/Lightpaper-ea59c0859ded4337bde4203b8445e1a3" target="_blank" rel='noreferrer' className='float-end text-decoration-none header-text' style={{marginRight: "20px"}}>Lightpaper</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
