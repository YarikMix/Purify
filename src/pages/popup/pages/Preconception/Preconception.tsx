import {Mode, updateState} from "@pages/state/extensionState";
import React, {useEffect, useState} from "react";
import useExtensionState from "@pages/hooks/useExtensionState";
import Toggle from "@pages/popup/components/Toggle/Toggle";

const Preconception = () => {

    const extensionState = useExtensionState();

    const [mode, setMode] = useState(extensionState.mode);

    useEffect(() => {
        setMode(extensionState.mode);
    }, [extensionState.mode]);

    const toggleMode = () => {
        setMode(
            extensionState.mode == Mode.fullPage
                ? Mode.selective
                : Mode.fullPage
        );
        updateState({
            mode:
                extensionState.mode == Mode.fullPage
                    ? Mode.selective
                    : Mode.fullPage,
        });
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Анализ предвзятости</h1>
                    <Toggle bg="dark" />
                </div>
                <div className="pl-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-4 rounded-sm bg-blue-300"></div>
                            <span className="text-stone-900 text-base">Предвзятость</span>
                        </div>
                        <Toggle bg="dark" />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-4 rounded-sm bg-yellow-300"></div>
                            <span className="text-stone-900 text-base">Агитация</span>
                        </div>
                        <Toggle bg="dark" />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">Отображать оригинальный текст</span>
                        <Toggle bg="dark" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preconception