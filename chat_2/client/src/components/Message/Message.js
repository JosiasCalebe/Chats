import React from 'react';


import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: {id, user, text, consecutive, date }, name}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
            isSentByCurrentUser = true;  
        }

    return(
        isSentByCurrentUser?(
            <div className={consecutive ? "messageContainer justifyEnd" : "messageContainer justifyEnd firstMessageContainer"}>
                <div className="time">
                    <p className="sentText colorDarkGray pr-10">{date}</p>
                </div>
                <div className={consecutive ? "messageBox backgroundBlue currentUser" : "messageBox backgroundBlue currentUser firstMessageBox"}>
                    <p className="sentText colorLightGray mt-10" style={{display:(consecutive)?'none':'block'}}>{trimmedName}</p>
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ):(
            <div className={(user === 'admin') ?  'messageContainer justifyCenter firstMessageContainer': (consecutive) ? "messageContainer justifyStart" : "messageContainer justifyStart firstMessageContainer"}>
                <div className={consecutive ? "messageBox backgroundLight outsideUser" : "messageBox backgroundLight outsideUser firstMessageBox"}>
                    <p className="sentText colorDarkGray mt-10" style={{display:(consecutive || user === 'admin')?'none':'block'}}>{user}</p>
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <div className="time">
                    <p className="sentText colorDark pl-10" style={{display:( user === 'admin')?'none':'block'}}>{date}</p>
                </div>
                
            </div>
        )
    )

};

export default Message;