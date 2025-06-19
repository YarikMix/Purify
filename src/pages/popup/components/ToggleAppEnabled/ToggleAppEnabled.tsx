import Toggle from "@pages/popup/components/Toggle/Toggle";
import React, {useState} from "react";
import {updateState} from "@pages/state/extensionState";

const ToggleAppEnabled = () => {

    const [enabled, setEnabled] = useState(true)

    const updateColor = async () => {
        updateState({
            enabled,
        })
        setEnabled(enabled => !enabled)
    }

    return <Toggle value={enabled} setValue={updateColor} color="green" bg="light"/>
}

export default ToggleAppEnabled