import axios from "axios";
import hotkeys from "hotkeys-js";

export const simplifyTextHotkeyInit = async (enabled:boolean) => {
    console.log("simplifyTextInit")
    hotkeys('g', async (e) => {
        e.preventDefault()

        console.log("hotkey press")

        const selection = window.getSelection();

        if (!selection?.focusNode?.textContent) {
            return
        }

        const text = selection.toString()

        console.log("text", text)

        const response = await axios.post('http://127.0.0.1:8080/api/v1/simplify', {
            blocks: [text]
        })

        console.log(response.data)

        const to = response.data.result[0].to

        console.log("to", to)

        if (to) {
            const parent = selection.focusNode.parentElement as HTMLElement
            parent.innerText = parent.innerText.replace(selection.toString(), response.data.result[0].to)
            parent.style.fontWeight = "bold"
        }

    });
}