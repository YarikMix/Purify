import Toggle from "@pages/popup/components/Toggle/Toggle";
import React from "react";

interface Props {
	disabled: boolean;
	value: boolean;
	onToggle: React.Dispatch<React.SetStateAction<boolean>>;
	label: string;
	sub?: boolean;
}

const Option = ({disabled, value, onToggle, label, sub}: Props) => {
	const cursorVariants = {
		enabled: "cursor-pointer",
		disabled: "cursor-not-allowed opacity-50",
	};

	return (
		<div
			className={[
				"flex justify-between items-center",
				cursorVariants[disabled ? "disabled" : "enabled"],
				sub && "pl-3",
			].join(" ")}
		>
			<span className="text-stone-900 text-base w-56 text-left">{label}</span>
			<Toggle bg="dark" value={value} setValue={onToggle} disabled={disabled} />
		</div>
	);
};

export default Option;
