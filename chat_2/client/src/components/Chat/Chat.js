import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error)=>{
            if(error){
                alert(error);
            };
        });

        
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            var data = Date.now();
            var date = new Date(data);
            if(messages.length > 0){
            (messages[messages.length - 1].user === message.user)?
            message = {id: messages.length + 1, user:message.user, text:message.text, consecutive:true, date: date.getHours()+":"+date.getMinutes()}:
            message = {id: messages.length + 1, user:message.user, text:message.text, consecutive:false, date: date.getHours()+":"+date.getMinutes()};}
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
          })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [messages]);

const sendMessage = (event) => {
    event.preventDefault();

    if(message){
        socket.emit('sendMessage', message, () => setMessage(''));
    }

};

    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages  messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
        );
};

export default Chat;