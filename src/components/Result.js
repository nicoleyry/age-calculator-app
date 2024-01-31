import '../styles/result.scss';

export default function Result({submitData, isSubmitted}) {

	let showResult = () => {
		console.log(submitData.day);
	};

	if(isSubmitted) {
		showResult();
	}


	return (
		<div className="Result">
			<h1>Day: {submitData.day}</h1>
			<h1>Month: {submitData.month}</h1>
			<h1>Year: {submitData.year}</h1>
		</div>
	)
};