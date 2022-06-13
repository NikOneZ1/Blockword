import React from 'react';
import mainpage_img from '../media/mainpage_img.svg';

const MainHome = () => {
    return (
        <div className="container-fluid">
            <div className='row align-items-center'>
                <div className="col-md-6 col-sm-12 text-align-center text-center" style={{display: "inline-block"}}>
                    <img className='p-4' style={{width: "80%"}} src={mainpage_img} alt="mainpage_img"/>
                </div>
                <div className='col-md-6 col-sm-12 p-2 text-align-center text-center' style={{display: "inline-block"}}>
                    <p style={{margin: "0"}} className="main-page-header-text">THE SAFEST PASSWORD</p>
                    <p style={{margin: "0"}} className="main-page-header-text">MANAGER MADE ON BLOCKCHAIN</p>
                    <p className='main-page-text'>Just connect your wallet and manage</p>
                    <p className='main-page-text'>your important data with Blockword</p>
                </div>
            </div>
            <div className='row align-items-center'>
                <div className='col-md-6 col-sm-12 p-2 mt-5 text-align-center text-center' style={{display: "inline-block"}}>
                    <p style={{margin: "0"}} className="main-page-header-text">INTERESTING IN BLOCKWORD?</p>
                    <p className='main-page-text'>Enter your email and be the first</p>
                    <p className='main-page-text'>to receive all the latest information</p>
                    <p className='main-page-text'>and news about the project</p>
                </div>
                <div className="col-md-6 col-sm-12 text-align-center text-center" style={{display: "inline-block"}}>
                    <div className="align-items-center email-form text-align-center text-center" style={{display: "inline-block"}}>
                        <div className='email-form-div'>
                            <p className='email-form-text'>EMAIL</p>
                            <form>
                                <input className='email-form-input' type="text" name="email"/>
                                <button className='email-form-button'>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainHome;