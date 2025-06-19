import React from "react";

type Props = {
    value: boolean
    setValue: React.Dispatch<React.SetStateAction<boolean>>
    color?: "blue" | "green"
    bg?: "light" | "dark"
    disabled?: boolean
}

const Toggle = ({value, setValue, color="blue", bg="light", disabled=false}:Props) => {
    const toggleValue = () => {
        setValue(value => !value)
    }

    const colorVariants = {
        blue: "peer-checked:bg-blue-600 dark:bg-blue-500",
        green: "peer-checked:bg-green-500 dark:bg-green-500",
    };

    const backgroundColorVariants = {
        light: "bg-gray-200 after:border-gray-300 dark:border-gray-300 dark:bg-gray-200",
        dark: "bg-gray-400 after:border-white dark:border-white dark:bg-gray-400",
    };

    const cursorVariants = {
        enabled: "cursor-pointer",
        disabled: "cursor-not-allowed"
    }

    return (
        <label className={["inline-flex", "items-center", cursorVariants[disabled ? "disabled" : "enabled"]].join(" ")}>
            <input type="checkbox" className="sr-only peer" checked={value} onChange={toggleValue} disabled={disabled}/>
            <div
                className={[
                    colorVariants[color],
                    backgroundColorVariants[bg],
                    "relative",
                    "w-11 h-6",
                    "rounded-full",
                    "peer",
                    "peer-checked:after:translate-x-full",
                    "rtl:peer-checked:after:-translate-x-full",
                    "peer-checked:after:border-white",
                    "after:content-['']",
                    "after:absolute",
                    "after:top-[2px]",
                    "after:start-[2px]",
                    "after:bg-white",
                    "after:border",
                    "after:rounded-full",
                    "after:h-5",
                    "after:w-5",
                    "after:transition-all"].join(" ")}
            ></div>
        </label>
    )
}

export default Toggle