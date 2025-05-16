import styles from "./SiteRatingBlock.module.css";
import {useSiteDomen} from "@pages/popup/hooks/useSiteDomen";
import clsx from "clsx";
import ExternalLink from "@pages/popup/components/Link/Link";
import {API_URL, LANDING_URL} from "@src/utils/consts";
import axios from "axios";
import {useEffect, useState} from "react";

const SiteRatingBlock = () => {
	const {siteDomen} = useSiteDomen();

	const [place, setPlace] = useState(null);

	const fetchSiteRating = async (domen) => {
		try {
			const response = await axios.get(API_URL + `/get_site_rating?site=${domen}`);

			setPlace(response.data.place);
		} catch {
			setPlace(null);
		}
	};

	useEffect(() => {
		if (siteDomen) {
			fetchSiteRating(siteDomen);
		}
	}, [siteDomen]);

	if (!place) {
		return (
			<div className={clsx(styles.container, "bg-gray-800", "shadow-md")}>
				<div className={styles.rightContainer}>
					<span className={styles.label}>
						Для анализа рейтинга ресурса <b>{siteDomen}</b> еще недостаточно данных
					</span>
					<ExternalLink label="Открыть общий рейтинг" url={LANDING_URL} />
				</div>
			</div>
		);
	}

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
