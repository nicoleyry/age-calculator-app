import { useState } from 'react';
import '../styles/wrapper.scss';
import Form from './Form';
import Result from './Result';
import moment from 'moment';

export default function Wrapper() {
	const [submitData, setSubmitData] = useState({day: "DD",month: "MM",year: "YYYY"});
	const [isSubmitted, setIsSubmitted] = useState(false);

	return (
		<div className="Wrapper">
			<Form moment={moment} setSubmitData={setSubmitData} setIsSubmitted={setIsSubmitted}/>
			<Result moment={moment} submitData={submitData} isSubmitted={isSubmitted}/>
		</div>
	)
};