import styles from "./SiteSecurityInfo.module.css";
import {useSiteDomen} from "@pages/popup/hooks/useSiteDomen";
import clsx from "clsx";

const SiteSecurityInfo = ({aggressive}) => {
	const {siteDomen} = useSiteDomen();

	return (
		<div className={clsx(styles.container, aggressive ? styles.bgRed : styles.bgGreen)}>
			<span className={clsx(styles.text, aggressive ? styles.textRed : styles.textGreen)}>
				Ресурс {siteDomen} {aggressive && "не"}безопасен для использования.
			</span>
		</div>
	);
};

export default SiteSecurityInfo;
