import styles from "./InfoBlockObscene.module.css"
import GraphPurple  from "@assets/graph_purple.svg?react"
import clsx from "clsx";

const InfoBlockObscene = ({percentage=46, count=256}) => {
	return (
		<div className={clsx(styles.container, "shadow-lg")}>
			<span className="text-sm">Нецензурная лексика</span>
			<span className="text-2xl">{percentage}%</span>
			<span className="text-xs">{count} нецензурных слов</span>
			<GraphPurple />
		</div>
	)
}

export default InfoBlockObscene