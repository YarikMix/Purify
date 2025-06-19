interface IProps {
	label: string;
	url: string;
}

const ExternalLink = ({label, url}: IProps) => {
	const handleClick = (e) => {
		e.preventDefault();
		chrome.tabs.create({active: true, url});
	};

	return (
		<a onClick={handleClick} className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
			{label}
		</a>
	);
};

export default ExternalLink;
