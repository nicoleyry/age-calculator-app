import { useState } from 'react';
import '../styles/form.scss';

export default function Form({moment, setSubmitData, setIsSubmitted}) {
	const [formData, setFormData] = useState({day: "",month: "",year: ""});
	const [error, setError] = useState({hasError: false, empty: false, valid: false, future: false});
	const [beforeSubmitCheck, setBeforeSubmitCheck] = useState(false);

	let changeHandler = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		setIsSubmitted(false);
		setError({hasError: false, empty: false, valid: false, future: false});
		setBeforeSubmitCheck(false);
	};

	let submitHandler = (e) => {
		e.preventDefault();
		setBeforeSubmitCheck(true);

		let dateString = `${formData.year} ${formData.month} ${formData.day}`;
		let dateIsValid = (moment(dateString, ["YYYY MM DD", "YYYY M D"], true).isValid());
		let dateIsBefore = moment(dateString).isBefore();
		let dateIsNotEmpty = (dateString.trim().length !== 0);
		let inputIsEmpty = (formData.year.trim().length === 0 || formData.month.trim().length === 0 || formData.day.trim().length === 0);

		if(dateIsNotEmpty && dateIsValid && dateIsBefore) {
			setSubmitData((prev) => ({...prev, ...formData}));
			setIsSubmitted(true);
		} else if(!dateIsNotEmpty) {
			setError({...error, hasError: true, empty: true});
		} else if(dateIsNotEmpty && dateIsValid && !dateIsBefore) {
			if(!inputIsEmpty) {
				setError({...error, hasError: true, future: true});
			}
		} else if(dateIsNotEmpty && !dateIsValid && dateIsBefore) {
			if(!inputIsEmpty) {
				setError({...error, hasError: true, valid: true});
			}
		} else if(dateIsNotEmpty && !dateIsValid && !dateIsBefore) {
			if(!inputIsEmpty) {
				setError({...error, hasError: true, valid: true, future: true});
			}
		}
	};

	return (
		<div className="Form">
			<form method='post' onSubmit={submitHandler}>
				<fieldset className='day'>
					<label>
						<p className={error.hasError || (formData.day.trim().length === 0 && beforeSubmitCheck) ? 'error label-text' : 'label-text'}>Day</p>
						<input 
							type="number"
							value={formData.day}
							onChange={changeHandler}
							name="day"
							placeholder='DD'
							className={error.hasError || (formData.day.trim().length === 0 && beforeSubmitCheck) ? 'error' : ''}
							/>
					</label>
					<p className="error-text">
						{error.empty || (formData.day.trim().length === 0 && beforeSubmitCheck) ? 'This field is required' : null}
						{error.valid ? 'Must be a valid day' : null}
					</p>
				</fieldset>
				<fieldset className='month'>
					<label>
						<p className={error.hasError || (formData.month.trim().length === 0 && beforeSubmitCheck) ? 'error label-text' : 'label-text'}>Month</p>
						<input 
							type="number"
							value={formData.month}
							onChange={changeHandler}
							name="month"
							placeholder='MM'
							className={error.hasError || (formData.month.trim().length === 0 && beforeSubmitCheck) ? 'error' : ''}
							/>
					</label>
					<p className="error-text">
						{error.empty || (formData.month.trim().length === 0 && beforeSubmitCheck) ? 'This field is required' : null}
						{error.valid && (0>=formData.month || formData.month>12) ? 'Must be a valid month' : null}
					</p>
				</fieldset>
				<fieldset className='year'>
					<label>
						<p className={error.hasError || (formData.year.trim().length === 0 && beforeSubmitCheck) ? 'error label-text' : 'label-text'}>Year</p>
						<input 
							type="number"
							value={formData.year}
							onChange={changeHandler}
							name="year"
							placeholder='YYYY'
							className={error.hasError || (formData.year.trim().length === 0 && beforeSubmitCheck) ? 'error' : ''}
							/>
					</label>
					<p className="error-text">
						{error.empty || (formData.year.trim().length === 0 && beforeSubmitCheck) ? 'This field is required' : null}
						{error.future ? 'Must be in the past' : null}
					</p>
				</fieldset>
				
				<button className='submit' type="submit">Submit</button>
			</form>
		</div>
	)
};