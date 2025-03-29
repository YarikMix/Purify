import styles from "./InfoBlockSimplify.module.css"
import GraphGreen from "@assets/graph_green.svg?react"
import clsx from "clsx";

const InfoBlockSimplify = ({percentage=46, count=256}) => {
	return (
		<div className={clsx(styles.container, "shadow-lg")}>
			<span className="text-sm">Упрощено</span>
			<span className="text-2xl">{percentage}%</span>
			<span className="text-sm">{count} слов сократилось</span>
			<div className="flex justify-center w-full">
				<GraphGreen/>
			</div>
		</div>
	)
}

export default InfoBlockSimplify