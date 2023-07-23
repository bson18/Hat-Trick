import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import logo from '../../assets/hattricklogo.png'
import "./SignupForm.css";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const validEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			if (!validEmail(email)) {
				setErrors(['Please enter a valid email address'])
				return
			}
			if (username.length < 4) {
				setErrors(['Username must be more than 4 characters'])
				return
			}
			if (password.length < 6) {
				setErrors(['Password must be longer than 6 characters'])
				return
			}
			const data = await dispatch(signUp(username, email, password, first_name, last_name));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<img src={logo} className="form-logo" />
			<h1>CREATE YOUR HAT-TRICK ACCOUNT</h1>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<div className="panels">
				<form className="signup-form" onSubmit={handleSubmit}>
					<label>
						FIRST NAME
						<input
							type="text"
							placeholder="FIRST NAME"
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
					<label>
						LAST NAME
						<input
							type="text"
							placeholder="LAST NAME"
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
					<label>
						EMAIL
						<input
							type="text"
							placeholder="EMAIL"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
						USERNAME
						<input
							type="text"
							placeholder="USERNAME"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<label>
						PASSWORD
						<input
							type="password"
							placeholder="PASSWORD"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label>
						CONFIRM PASSWORD
						<input
							type="password"
							placeholder="CONFIRM PASSWORD"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					<button className="submit-btn" type="submit">SIGN UP</button>
				</form>
				<OpenModalButton
					className="signup-form-button"
					buttonText="LOGIN INSTEAD"
					modalComponent={<LoginFormModal />}
				/>
			</div>

		</>
	);
}

export default SignupFormModal;
