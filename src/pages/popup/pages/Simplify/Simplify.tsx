import Toggle from "@pages/popup/components/Toggle/Toggle";
import React from "react";
import KeyboardTooltip from "@pages/popup/components/KeyboardTooltip/KeyboardTooltip";

export const Simplify = () => {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Упрощение текста</h1>
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
                            <KeyboardTooltip keys={["Cmd", "F"]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simplify