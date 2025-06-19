import styles from "./InfoBlockSimplify.module.css";
import GraphGreen from "@assets/graph_green.svg?react";
import clsx from "clsx";
import {percentage} from "@pages/popup/utils/utils";

interface IProps {
	replaced: number;
	total: number;
}

const InfoBlockSimplify = ({replaced, total}: IProps) => {
	return (
		<div className={clsx(styles.container, "shadow-lg")}>
			<span className="text-sm">Упрощено</span>
			<span className="text-2xl">{total ? percentage(replaced, total) : 0}%</span>
			<span className="text-sm">{replaced} слов сократилось</span>
			<div className="flex justify-center w-full">
				<GraphGreen />
			</div>
		</div>
	);
};

export default InfoBlockSimplify;
