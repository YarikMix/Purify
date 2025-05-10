import styles from "./InfoBlockAggressive.module.css";
import GraphRed from "@assets/graph_red.svg?react";
import clsx from "clsx";
import {percentage} from "@pages/popup/utils/utils";

interface IProps {
	replaced: number;
	total: number;
}

const InfoBlockAggressive = ({replaced, total}: IProps) => {
	return (
		<div className={clsx(styles.container, "shadow-lg")}>
			<span className="text-sm">Агрессия</span>
			<span className="text-2xl">{total ? percentage(replaced, total) : 0}%</span>
			<span className="text-xs">{replaced} агрессивных слов</span>
			<div className="flex justify-center w-full">
				<GraphRed />
			</div>
		</div>
	);
};

export default InfoBlockAggressive;
