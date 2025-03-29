import styles from "./InfoBlockAggressive.module.css"
import GraphRed from "@assets/graph_red.svg?react"
import clsx from "clsx";

const InfoBlockAggressive = ({percentage=46, count=256}) => {
    return (
        <div className={clsx(styles.container, "shadow-lg")}>
            <span className="text-sm">Агрессия</span>
            <span className="text-2xl">{percentage}%</span>
            <span className="text-xs">{count} агрессивных слов</span>
            <GraphRed />
        </div>
    )
}

export default InfoBlockAggressive