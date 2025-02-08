import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDarkMode, editUser, deleteUser } from '../redux/userSlice';
import { FaEdit, FaTrash, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaRegSave } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import '../styles/style.scss';

const UserCard = ({ user }) => {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(user.name);

    const handleEdit = () => {
        dispatch(editUser({ id: user.id, field: 'name', value: editedName }));
        setEditing(false);
    };

    return (
        <div className={`card ${user.darkMode ? '' : 'dark'}`}>
            {/* Toggle Dark Mode */}
            <MdDarkMode className="toggle-dark" onClick={() => dispatch(toggleDarkMode(user.id))} />

            {/* Edit & Delete Icons */}
            <div className="icons">
                {editing ? (
                    <FaRegSave onClick={handleEdit} className="save-btn"/>
                ) : (
                    <FaEdit onClick={() => setEditing(true)} className="edit-icon" />
                )}
                <FaTrash onClick={() => dispatch(deleteUser(user.id))} className="delete-icon" />
            </div>

            {/* Profile Image */}
            <div className="profile">
                <img src="https://tse3.mm.bing.net/th?id=OIP.1Lj84SoCogF12XqtZ9U32wAAAA&pid=Api&P=0&h=180" alt="User Avatar" />
            </div>

            {/* User Info */}
            <div className="info">
                {editing ? (
                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                ) : (
                    <h2 className="name">{user.name}</h2>
                )}
                <p className="designation">{user.company.name}</p>
                <a href={`mailto:${user.email}`} className="email">{user.email}</a>
            </div>

            {/* User Details Table */}
          

            {/* Social Media Icons */}
            <div className="social-icons">
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaGithub /></a>
            </div>
        </div>
    );
};

export default UserCard;
