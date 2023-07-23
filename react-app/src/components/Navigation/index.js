import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import hattricklogo from '../../assets/hattricklogo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<div className="profile-menu">
				<NavLink className='create-link' to='/new'>
					<div id='create-post-link'>NEW ARTICLE</div>
				</NavLink>
				<div className="profile-btn">
					<ProfileButton user={sessionUser} />
				</div>
			</div>
		);
	} else {
		sessionLinks = (
			<div className='profile-btn'>
				<ProfileButton user={sessionUser} />
			</div>
		);
	}

	return (
		<nav>
			<div className="nav-container">
				<NavLink exact to="/">
					<img src={hattricklogo} id='logo' />
				</NavLink>
				{isLoaded && sessionLinks}

			</div>
		</nav>
	);
}

export default Navigation;
