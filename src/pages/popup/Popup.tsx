import React, {useEffect, useState} from 'react';
import useExtensionState from "@pages/hooks/useExtensionState";
import {Mode, updateState} from "@pages/state/extensionState";

export default function Popup() {

    const extensionState = useExtensionState();

    const [mode, setMode] = useState(extensionState.mode)

    // const updateColor = async () => {
    //     updateState({
    //         color,
    //     })
    //
    //     let [tab] = await chrome.tabs.query({active: true})
    //     chrome.scripting.executeScript({
    //         target: {tabId: tab.id},
    //         args: [color],
    //         func: (color) => {
    //             console.log(`Новый цвет: ${color}`)
    //         }
    //     })
    // }

    // useEffect(() => {
    //     setColor(extensionState.color)
    // }, [extensionState.color]);

    useEffect(() => {
        setMode(extensionState.mode)
    }, [extensionState.mode])

    const toggleMode = () => {
        console.log(`Новый цвет: ${mode}`)
        setMode(extensionState.mode == Mode.fullPage ? Mode.selective : Mode.fullPage)
        updateState({
            mode: extensionState.mode == Mode.fullPage ? Mode.selective : Mode.fullPage
        })
    }

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
            <header className="flex flex-col justify-center text-white gap-4">
                <h2 className="text-4xl font-extrabold dark:text-white">Purify</h2>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={mode == Mode.fullPage} onChange={toggleMode} className="sr-only peer" />
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-300">Полный анализ страницы</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={mode == Mode.selective} onChange={toggleMode} className="sr-only peer" />
                    <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-300">Анализ выбранного текста</span>
                </label>
                <div className="inline-flex items-center font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
                    <kbd
                        className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Shift</kbd>
                    <span className="mx-2">+</span>
                    <kbd
                        className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">R</kbd>
                    <span className="ms-3 text-sm font-medium text-gray-300">Комбинация клавиш</span>
                </div>
            </header>
        </div>
    );
}
