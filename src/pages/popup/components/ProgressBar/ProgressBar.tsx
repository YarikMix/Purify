import {Line} from "rc-progress";
import React from "react";

interface IProps {
	currentValue: number;
	maxValue: number;
	label: number;
}

const ProgressBar = ({currentValue, maxValue, label}: IProps) => {
	const ratio = currentValue / maxValue;

	if (ratio == 1) {
		return null;
	}

	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-stone-900 text-base">{label}</h3>
			<Line percent={100 * (currentValue / maxValue)} strokeColor={"#2b7fff"} />
		</div>
	);
};

export default ProgressBar;
