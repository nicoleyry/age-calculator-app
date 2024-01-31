import { useState } from 'react';
import '../styles/form.scss';

export default function Form({setSubmitData, setIsSubmitted}) {
	const [formData, setFormData] = useState({day: "DD",month: "MM",year: "YYYY"});
	
	let changeHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setIsSubmitted(false);
	};

	let submitHandler = (e) => {
		e.preventDefault();
		setSubmitData((prev) => ({...prev, ...formData}));
		setIsSubmitted(true);
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
						/>
				</label>
				<label>
					<p>Month</p>
					<input 
						type="number"
						value={formData.month}
						onChange={changeHandler}
						name="month"
						/>
				</label>
				<label>
					<p>Year</p>
					<input 
						type="number"
						value={formData.year}
						onChange={changeHandler}
						name="year"
						/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	)
};