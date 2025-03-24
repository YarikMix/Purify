import Toggle from "@pages/popup/components/Toggle/Toggle";

const Home = () => {
    return (
        <div className="flex flex-col gap-8 w-full">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-stone-900 text-base font-black">Фильтр мата</h1>
                    <Toggle bg="dark" />
                </div>
                <div className="pl-4 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-stone-900 text-base">Использовать ИИ</span>
                        <Toggle bg="dark" />
                    </div>
                    <div className="flex justify-between items-center">
                        <a href="https://2ch.hk/fiz/" target="_blank" rel="noreferrer">
                            <span className="text-stone-900 text-base">Связаться с разработчиками</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home