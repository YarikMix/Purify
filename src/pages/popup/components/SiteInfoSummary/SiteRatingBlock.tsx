import styles from "./SiteRatingBlock.module.css";
import {useSiteDomen} from "@pages/popup/hooks/useSiteDomen";
import clsx from "clsx";
import ExternalLink from "@pages/popup/components/Link/Link";
import {LANDING_URL} from "@src/utils/consts";

const SiteRatingBlock = () => {
	const {siteDomen} = useSiteDomen();

	const place = 1;

	return (
		<div className={clsx(styles.container, "bg-gray-800", "shadow-md")}>
			<div className={styles.leftContainer}>
				<div className={styles.rating}>№{place}</div>
			</div>
			<div className={styles.rightContainer}>
				<span className={styles.label}>
					Ресурс <b>{siteDomen}</b> находится на <b>№{place}</b> месте в рейтинге безопасных сайтов
				</span>
				<ExternalLink label="Открыть общий рейтинг" url={LANDING_URL} />
			</div>
		</div>
	);
};

export default SiteRatingBlock;
