import Toggle from "@pages/popup/components/Toggle/Toggle";
import useExtensionState from "@pages/hooks/useExtensionState";
import React, {useEffect, useState} from "react";
import {updateState} from "@pages/state/extensionState";

const Aggression = () => {
    const extensionState = useExtensionState()

    const [localAggressionFilterEnabled, setLocalAggressionFilterEnabled] = useState(extensionState.aggressionFilterEnabled)

    useEffect(() => {
        setLocalAggressionFilterEnabled(extensionState.aggressionFilterEnabled)
    }, [extensionState])

    const handleToggle = () => {
        updateState({
            aggressionFilterEnabled: !extensionState.aggressionFilterEnabled
        })
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Анализ агрессии</h1>
                    <Toggle value={extensionState.aggressionFilterEnabled} setValue={handleToggle} bg="dark" />
                </div>
                <div className="pl-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">Фильтровать</span>
                        <Toggle bg="dark"/>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">Заменять</span>
                        <Toggle bg="dark"/>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">Отображать оригинальный текст</span>
                        <Toggle bg="dark"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aggression