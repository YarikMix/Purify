import angryIcon from "@assets/angry.png";
import kindIcon from "@assets/kind.png";
import styles from "./SiteInfoSummary.module.css";
import clsx from "clsx";

type Props = {
	site: string;
	aggressive: boolean;
	aggressive_percent: number;
	aggitation_percent: number;
	mat_percent: number;
	bias_percent: number;
};

const SiteInfoSummary = ({
	site,
	aggressive,
	aggressive_percent,
	aggitation_percent,
	mat_percent,
	bias_percent,
}: Props) => {
	return (
		<div
			className={clsx(
				styles.container,
				aggressive ? styles.angryBg : styles.kindBg,
			)}
		>
			<div>
				<span>
					Ресурс {site} {aggressive && "не"}{" "}
					рекомендован к использованию
				</span>
			</div>
			<div className={styles.gridContainer}>
				<div className={styles.imgContainer}>
					<img
						src={
							aggressive
								? angryIcon
								: kindIcon
						}
						className={styles.img}
						alt="icon"
					/>
				</div>
				{aggressive_percent > 0 && (
					<span
						className={clsx(
							styles.gridItem,
							styles.gridItem1,
						)}
					>
						Найдена агрессия
					</span>
				)}
				{bias_percent > 0 && (
					<span
						className={clsx(
							styles.gridItem,
							styles.gridItem2,
						)}
					>
						Найдена предвзятость
					</span>
				)}
				{mat_percent > 0 && (
					<span
						className={clsx(
							styles.gridItem,
							styles.gridItem3,
						)}
					>
						Найдена нецензурная лексика
					</span>
				)}
				{aggitation_percent > 0 && (
					<span
						className={clsx(
							styles.gridItem,
							styles.gridItem4,
						)}
					>
						Найдена агитация
					</span>
				)}
			</div>
		</div>
	);
};

export default SiteInfoSummary;
