import Toggle from "@pages/popup/components/Toggle/Toggle";
import React from "react";

const Option = ({disabled, value, onToggle, label}) => {

	const cursorVariants = {
		enabled: "cursor-pointer",
		disabled: "cursor-not-allowed opacity-50"
	}

	return <div className={["flex justify-between items-center", cursorVariants[disabled ? "disabled" : "enabled"]].join(" ")}>
		<span className="text-stone-900 text-base">{label}</span>
		<Toggle bg="dark" value={value} setValue={onToggle} disabled={disabled}/>
	</div>
}

export default Option