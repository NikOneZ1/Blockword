import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return(
        <div className='container-fluid header' style={{padding: "0px"}}>
            <header className="p-3 d-flex flex-wrap align-items-center justify-content-beetween" style={{backgroundColor: "black"}}>
                <div className='col-md-5'>
                    <a className='text-decoration-none header-text' rel="noreferrer" target="_blank" href="https://nikone.notion.site/Lightpaper-ea59c0859ded4337bde4203b8445e1a3" style={{margin: "0px"}}>Lightpaper</a>
                </div>    
                <img src={blockwordWhiteLogo} style={{height: "70px"}} alt="Blockword" className='col-md-2'/>
                <div className='col-md-5'>
                    <button className='header-button float-end'>Open app</button>
                </div>
            </header>
        </div>
    )
}

export default Header;
