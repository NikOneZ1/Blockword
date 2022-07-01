import React from 'react';
import blockwordWhiteLogo from '../media/blockwordWhiteLogo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppHeader = (props) => {
    const search = value => {
        props.search(value);
    }
    return(
        <div className='container-fluid header' style={{padding: "0px"}}>
            <header className="p-3 d-flex flex-wrap align-items-center justify-content-beetween" style={{backgroundColor: "black"}}>    
                <img src={blockwordWhiteLogo} style={{height: "70px"}} alt="Blockword" className='col-md-2'/>
                <div className='col-md-8 d-flex justify-content-center'>
                    <input type="text" className='col-md-7 search-field' placeholder='Search account' onChange={(e) => search(e.target.value)}/>
                </div>
                <div className='col-md-2'>
                    <button id='connect-wallet-button' className='app-header-button float-end'>Connect to metamask</button>
                </div>
            </header>
        </div>
    )
}

export default AppHeader;