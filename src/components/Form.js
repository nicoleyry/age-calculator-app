import { useState } from 'react';
import '../styles/form.scss';

export default function Form({moment, setSubmitData, setIsSubmitted}) {
	const [formData, setFormData] = useState({day: "",month: "",year: ""});
	const [error, setError] = useState(false);
	
	let changeHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setIsSubmitted(false);
		setError(false)
	};

	let submitHandler = (e) => {
		e.preventDefault();
		let dateString = `${formData.year}-${formData.month}-${formData.day}`;
		let dateIsValid = moment(dateString, ["YYYY-MM-DD", "YYYY-M-D"], true).isValid();

		if(dateIsValid) {
			setSubmitData((prev) => ({...prev, ...formData}));
			setIsSubmitted(true);
		} else {
			setError(true);
		}

	};

	return (
		<div className="Form">
			<form method='post' onSubmit={submitHandler}>
				<label>
					<p>Day</p>
					<input 
						type="number"
						value={formData.day}
						onChange={changeHandler}
						name="day"
						placeholder='DD'
						/>
				</label>
				<label>
					<p>Month</p>
					<input 
						type="number"
						value={formData.month}
						onChange={changeHandler}
						name="month"
						placeholder='MM'
						/>
				</label>
				<label>
					<p>Year</p>
					<input 
						type="number"
						value={formData.year}
						onChange={changeHandler}
						name="year"
						placeholder='YYYY'
						/>
				</label>
				{error ? <p>ERROR!!!</p> : null}
				<button type="submit">Submit</button>
			</form>
		</div>
	)
};