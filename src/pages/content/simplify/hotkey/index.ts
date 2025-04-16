import axios from "axios";
import hotkeys from "hotkeys-js";
import {API_URL} from "@src/consts";

export const toggleSimplifyTextHotkey = async (enabled:boolean) => {
    console.log("simplifyTextInit")


    const handleHotkeyPress = (e:KeyboardEvent) => {
        // e.preventDefault()

        console.log("hotkey press")

        const selection = window.getSelection();

        if (!selection?.focusNode?.textContent) {
            return
        }

        const text = selection.toString()

        console.log("text", text)

        axios.post(API_URL + '/simplify', {
            blocks: [text]
        }).then(response => {
            console.log(response.data)

            const to = response.data.result[0].to

            console.log("to", to)

            if (to && selection?.focusNode) {
                const parent = selection.focusNode.parentElement as HTMLElement
                parent.innerText = parent.innerText.replace(selection.toString(), response.data.result[0].to)
                parent.style.fontWeight = "bold"
            }
        })
    }

    if (enabled) {
        hotkeys('g', handleHotkeyPress);
    } else {
        hotkeys.unbind('g');
    }
}