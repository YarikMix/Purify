import React from "react";

type Props = {
    value: boolean
    setValue: React.Dispatch<React.SetStateAction<boolean>>
    color?: "blue" | "red"
    bg?: "light" | "dark"
}

const Toggle = ({value, setValue, color="blue", bg="light"}:Props) => {
    const toggleValue = () => {
        setValue(value => !value)
    }

    const colorVariants = {
        blue: "peer-checked:bg-blue-600 dark:bg-blue-500",
        red: "peer-checked:bg-red-600 dark:bg-red-500",
    };

    const backgroundColorVariants = {
        light: "bg-gray-200 after:border-gray-300",
        dark: "bg-gray-400 after:border-white",
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={value} onChange={toggleValue}/>
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