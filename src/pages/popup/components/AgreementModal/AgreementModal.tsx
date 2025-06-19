import React from "react";
import useAppState from "@pages/popup/hooks/useAppState";

const AgreementModal = () => {
	const [_, setState] = useAppState();

	const handleAccept = () => {
		setState({
			agreement: true,
		});
	};

	return (
		<>
			<div className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"></div>

			<div
				id="default-modal"
				tabIndex="-1"
				aria-hidden="true"
				className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full md:inset-0 flex"
			>
				<div className="relative p-4 w-full max-w-2xl max-h-full">
					<div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
								Пользовательское соглашение
							</h3>
							{/*<button*/}
							{/*	type="button"*/}
							{/*	className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute top-4 right-4"*/}
							{/*	data-modal-hide="default-modal"*/}
							{/*>*/}
							{/*	<svg*/}
							{/*		className="w-3 h-3"*/}
							{/*		aria-hidden="true"*/}
							{/*		xmlns="http://www.w3.org/2000/svg"*/}
							{/*		fill="none"*/}
							{/*		viewBox="0 0 14 14"*/}
							{/*	>*/}
							{/*		<path*/}
							{/*			stroke="currentColor"*/}
							{/*			strokeLinecap="round"*/}
							{/*			strokeLinejoin="round"*/}
							{/*			strokeWidth="2"*/}
							{/*			d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"*/}
							{/*		/>*/}
							{/*	</svg>*/}
							{/*	<span className="sr-only">Close modal</span>*/}
							{/*</button>*/}
						</div>
						<div className="p-4 md:p-5 space-y-4">
							<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
								Расширение автоматически собирает и анализирует данные с посещенных вами
								веб-страниц
							</p>
						</div>
						<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								data-modal-hide="default-modal"
								type="button"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={handleAccept}
							>
								Я прочитал
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AgreementModal;
