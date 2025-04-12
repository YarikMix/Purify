import Toggle from "@pages/popup/components/Toggle/Toggle";
import React, {useEffect, useState} from "react";
import KeyboardTooltip from "@pages/popup/components/KeyboardTooltip/KeyboardTooltip";
import InfoBlockSimplify from "@pages/popup/components/InfoBlockSimplify/InfoBlockSimplify";
import {DEFAULT_SIMPLIFY_STATE, T_SimplifyState} from "@src/types";

export const Simplify = () => {

    const [state, setState] = useState<T_SimplifyState>(null)

    useEffect(() => {
        chrome.storage.sync.get<T_SimplifyState>(DEFAULT_SIMPLIFY_STATE, (state) => {
            setState(state)
        });
    }, []);

    const handleToggleSimplifyEnabled = () => {
        chrome.storage.sync.set({
            "simplifyEnabled": !state.simplifyEnabled,
            "simplifyDynamic": !state.simplifyEnabled
        });

        setState({
            simplifyEnabled: !state.simplifyEnabled,
            simplifyDynamic: !state.simplifyEnabled,
        })
    }

    const handleToggleSimplifyDynamic = () => {
        chrome.storage.sync.set({
            "simplifyDynamic": !state.simplifyDynamic
        });

        setState({
            ...state,
            simplifyDynamic: !state.simplifyDynamic
        })
    }

    if (!state) {
        return
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Упрощение текста</h1>
                    <Toggle bg="dark" value={state.simplifyEnabled} setValue={handleToggleSimplifyEnabled} />
                </div>
                <div className="pl-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">На всей странице</span>
                        <Toggle bg="dark" value={state.simplifyDynamic} setValue={handleToggleSimplifyDynamic} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">В выделенном тексте</span>
                        <div className="text-base">
                            <KeyboardTooltip keys={["Cmd", "F"]} />
                        </div>
                    </div>
                </div>
            </div>
            {/*<InfoBlockSimplify />*/}
        </div>
    );
};

export default Simplify