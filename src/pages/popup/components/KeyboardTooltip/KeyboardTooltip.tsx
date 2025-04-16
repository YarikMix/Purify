type Props = {
    keys: string[]
}

const KeyboardTooltip = ({keys}:Props) => {
    return keys.map((key, idx) =>
        <>
            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                {key}
            </kbd>
            {idx != keys.length - 1 && <span>+</span>}
        </>
    )
}

export default KeyboardTooltip