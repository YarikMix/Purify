import Toggle from "@pages/popup/components/Toggle/Toggle";
import React, {useEffect, useRef, useState} from "react";
import Option from "@pages/popup/components/Option/Option";
import SiteSecurityInfo from "@pages/popup/components/SiteSecurityInfo/SiteSecurityInfo";
import InfoBlockAggressive from "@pages/popup/components/InfoBlockAggressive/InfoBlockAggressive";
import InfoBlockObscene from "@pages/popup/components/InfoBlockObscene/InfoBlockObscene";
import {T_AggressionState} from "@src/types";
import {animated, useSpring, config} from "react-spring";

const Aggression = () => {

    const [state, setState] = useState<T_AggressionState>(null)

    useEffect(() => {
        chrome.storage.sync.get<T_AggressionState>(["aggressionEnabled", "aggressionFilterText", "aggressionFilterImages", "aggressionReplacementText", "aggressionShowOriginalText"], (state) => {
            setState(state)
        });
    }, []);

    const handleToggleAggressionEnabled = () => {
        chrome.storage.sync.set({
            "aggressionEnabled": !state.aggressionEnabled,
            "aggressionFilterText": !state.aggressionEnabled,
            "aggressionReplacementText": false,
            "aggressionShowOriginalText": false
        });

        setState({
            aggressionEnabled: !state.aggressionEnabled,
            aggressionFilterText: !state.aggressionEnabled,
            aggressionReplacementText: false,
            aggressionShowOriginalText: false,
            aggressionFilterImages: false,
        })
    }

    const handleToggleFilterText = () => {
        chrome.storage.sync.set({
            "aggressionFilterText": !state.aggressionFilterText,
            "aggressionReplacementText": false,
            "aggressionShowOriginalText": false
        });

        setState({
            ...state,
            aggressionFilterText: !state.aggressionFilterText,
            aggressionReplacementText: false,
            aggressionShowOriginalText: false
        })
    }

    const handleToggleReplacementText = () => {

        let aggressionShowOriginalTextNewValue = state.aggressionShowOriginalText

        if (state.aggressionReplacementText) {
            aggressionShowOriginalTextNewValue = false
        }

        chrome.storage.sync.set({
            "aggressionFilterText": false,
            "aggressionReplacementText": !state.aggressionReplacementText,
            "aggressionShowOriginalText": aggressionShowOriginalTextNewValue
        });

        setState({
            ...state,
            aggressionFilterText: false,
            aggressionReplacementText: !state.aggressionReplacementText,
            aggressionShowOriginalText: aggressionShowOriginalTextNewValue
        })
    }

    const handleToggleShowOriginalText = () => {
        chrome.storage.sync.set({
            "aggressionShowOriginalText": !state.aggressionShowOriginalText
        });

        setState({
            ...state,
            aggressionShowOriginalText: !state.aggressionShowOriginalText
        })
    }

    const handleToggleFilterImages = () => {
        chrome.storage.sync.set({
            "aggressionFilterImages": !state.aggressionFilterImages
        });

        setState({
            ...state,
            aggressionFilterImages: !state.aggressionFilterImages
        })
    }

    const ref = useRef<HTMLDivElement>(null);

    const props = useSpring({
        delay: 100,
        from: { height: !state?.aggressionEnabled || ref.current ? '0px' : '150px' },
        to: { height: state?.aggressionEnabled ? '150px' : '0px' },
    });

    if (!state) {
        return
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Анализ агрессии</h1>
                    <Toggle value={state.aggressionEnabled} setValue={handleToggleAggressionEnabled} bg="dark" />
                </div>
                <animated.nav style={props} ref={ref} className="pl-4 flex flex-col gap-4 overflow-hidden">
                    <Option label="Фильтровать текст" value={state.aggressionFilterText}
                            onToggle={handleToggleFilterText} disabled={!state.aggressionEnabled}/>
                    <Option label="Заменять текст" value={state.aggressionReplacementText}
                            onToggle={handleToggleReplacementText} disabled={!state.aggressionEnabled}/>
                    <Option label="Отображать оригинальный текст"
                            value={state.aggressionShowOriginalText}
                            onToggle={handleToggleShowOriginalText}
                            disabled={!state.aggressionEnabled || !state.aggressionReplacementText}
                            sub={true}
                    />
                    <Option label="Фильтровать изображения" value={state.aggressionFilterImages}
                            onToggle={handleToggleFilterImages} disabled={!state.aggressionEnabled}/>
                </animated.nav>
            </div>
            {/*<div className="flex flex-col gap-4">*/}
            {/*    <SiteSecurityInfo aggressive={true}/>*/}
            {/*    <div className="flex gap-4 justify-around">*/}
            {/*        <InfoBlockAggressive />*/}
            {/*        <InfoBlockObscene />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default Aggression