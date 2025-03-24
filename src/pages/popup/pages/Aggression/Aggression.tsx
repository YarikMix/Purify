import Toggle from "@pages/popup/components/Toggle/Toggle";
import {useState} from "react";
import KeyboardTooltip from "@pages/popup/components/KeyboardTooltip/KeyboardTooltip";

const Aggression = () => {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Анализ агрессии</h1>
                    <Toggle bg="dark" />
                </div>
                <div className="pl-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">На всей странице</span>
                        <Toggle bg="dark" />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">В выделенном тексте</span>
                        <div className="text-base">
                            <KeyboardTooltip keys={["Cmd", "D"]}/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Фильтр мата</h1>
                    <Toggle bg="dark" />
                </div>
            </div>
        </div>
    )
}

export default Aggression