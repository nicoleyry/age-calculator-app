import { useState, useEffect } from 'react';
import '../styles/result.scss';

export default function Result({moment, submitData, isSubmitted}) {
	const [result, setResult] = useState({day: "--",month: "--",year: "--"});

	let checkNegative = (num) => {
		return num < 0 ? num * (-1) : num;
	};

	let showResult = () => {
		let dateString = `${submitData.year}-${submitData.month}-${submitData.day}`;

		let diff = moment(dateString).diff(moment(), 'milliseconds');
		let duration = moment.duration(diff);

		setResult({
			day: checkNegative(duration.days()),
			month: checkNegative(duration.months()),
			year: checkNegative(duration.years())
		});
	};

	useEffect(() => {
		if(isSubmitted) {
			showResult();
		}
	}, [isSubmitted]);

	return (
		<div className="Result">
			<h1>Day: {result.day}</h1>
			<h1>Month: {result.month}</h1>
			<h1>Year: {result.year}</h1>
		</div>
	)
};