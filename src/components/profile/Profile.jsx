// Profile.js
import React from 'react';
import '../../styles/Profile.css';
import DefaultAvatar from '../../assets/images/DefaultAvatar.png';
//import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
//import  {storage} from '../../configs/Firebase'
export default function Profile({ user, onClose }) {
    return (
        <div className="profile-popup-overlay" onClick={onClose}>
            <div className="profile-popup" onClick={(e) => e.stopPropagation()}>
                <img
                    src={user.picture || DefaultAvatar}
                    alt={user.name || 'User'}
                    className="profile-avatar"
                />
                <h2 style={{color: 'black'}}>{user.name}</h2>
                <input type="text" value={user.email || ''} readOnly className="profile-email" />
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
}
