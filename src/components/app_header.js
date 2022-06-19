import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppHeader = (props) => {
    return(
        <div className='container-fluid header' style={{padding: "0px"}}>
            <header className="p-3 d-flex flex-wrap align-items-center justify-content-beetween" style={{backgroundColor: "black"}}>    
                <img src={blockwordWhiteLogo} style={{height: "70px"}} alt="Blockword" className='col-md-2'/>
                <div className='col-md-8 d-flex justify-content-center'>
                    <input type="text" className='col-md-7' placeholder="Search.."/>
                </div>
                <div className='col-md-2'>
                    <button className='header-button float-end' disabled>Open app</button>
                </div>
            </header>
        </div>
    )
}

export default AppHeader;