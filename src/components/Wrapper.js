import { useState } from 'react';
import '../styles/wrapper.scss';
import Form from './Form';
import Result from './Result';

export default function Wrapper() {
	const [submitData, setSubmitData] = useState({day: "DD",month: "MM",year: "YYYY"});
	const [isSubmitted, setIsSubmitted] = useState(false);

	return (
		<div className="Wrapper">
			<Form setSubmitData={setSubmitData} setIsSubmitted={setIsSubmitted}/>
			<Result submitData={submitData} isSubmitted={isSubmitted}/>
		</div>
	)
};