import Toggle from "@pages/popup/components/Toggle/Toggle";
import useExtensionState from "@pages/hooks/useExtensionState";
import React from "react";
import {updateState} from "@pages/state/extensionState";
import Option from "@pages/popup/components/Option/Option";

const Aggression = () => {
    const extensionState = useExtensionState()

    // const [localAggressionFilterEnabled, setLocalAggressionFilterEnabled] = useState(extensionState.aggressionFilterEnabled)
    //
    // useEffect(() => {
    //     setLocalAggressionFilterEnabled(extensionState.aggressionFilterEnabled)
    // }, [extensionState])

    const handleToggleAggressionEnabled = () => {
        updateState({
            aggressionEnabled: !extensionState.aggressionEnabled,
            aggressionFilterEnabled: false,
            aggressionReplacementEnabled: false,
            aggressionShowOriginalText: false
        })
    }

    const handleToggleAggressionFilterEnabled = () => {
        updateState({
            aggressionFilterEnabled: !extensionState.aggressionFilterEnabled,
            aggressionReplacementEnabled: false,
            aggressionShowOriginalText: false
        })
    }

    const handleToggleAggressionReplacementEnabled = () => {

        let aggressionShowOriginalTextNewValue = extensionState.aggressionShowOriginalText

        if (extensionState.aggressionReplacementEnabled) {
            aggressionShowOriginalTextNewValue = false
        }

        updateState({
            aggressionFilterEnabled: false,
            aggressionReplacementEnabled: !extensionState.aggressionReplacementEnabled,
            aggressionShowOriginalText: aggressionShowOriginalTextNewValue
        })
    }

    const handleToggleAggressionShowOriginalText = () => {
        updateState({
            aggressionShowOriginalText: !extensionState.aggressionShowOriginalText
        })
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Анализ агрессии</h1>
                    <Toggle value={extensionState.aggressionEnabled} setValue={handleToggleAggressionEnabled} bg="dark" />
                </div>
                <div className="pl-4 flex flex-col gap-4">
                    <Option label="Фильтровать текст" value={extensionState.aggressionFilterEnabled} onToggle={handleToggleAggressionFilterEnabled} disabled={!extensionState.aggressionEnabled}/>
                    <Option label="Заменять текст" value={extensionState.aggressionReplacementEnabled} onToggle={handleToggleAggressionReplacementEnabled} disabled={!extensionState.aggressionEnabled}/>
                    <Option label="Отображать оригинальный текст" value={extensionState.aggressionShowOriginalText} onToggle={handleToggleAggressionShowOriginalText} disabled={!extensionState.aggressionEnabled || !extensionState.aggressionReplacementEnabled}/>
                    <Option label="Фильтровать изображения" />
                </div>
            </div>
        </div>
    )
}

export default Aggression