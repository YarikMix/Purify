import angryIcon from "@assets/angry.png"
import kindIcon from "@assets/kind.png"
import styles from "./SiteInfoSummary.module.css"
import clsx from "clsx";


type Props = {
    site: string
    aggressive: boolean
    aggressivePercentage: number
    obsceneLanguagePercentage: number
    biasPercentage: number
    agitationPercentage: number
}

const SiteInfoSummary = ({site, aggressive, aggressivePercentage, obsceneLanguagePercentage, biasPercentage, agitationPercentage}: Props) => {
    return (
        <div className={clsx(styles.container, aggressive ? styles.angryBg : styles.kindBg)}>
            <div>
                <span>Ресурс {site} {aggressive && "не"} рекомендован к использованию</span>
            </div>
            <div className={styles.gridContainer}>
                <div className={styles.imgContainer}>
                    <img src={aggressive ? angryIcon : kindIcon} className={styles.img} alt="icon" />
                </div>
                <span className={clsx(styles.gridItem, styles.gridItem1)}>{aggressivePercentage}% агрессии</span>
                <span className={clsx(styles.gridItem, styles.gridItem2)}>{obsceneLanguagePercentage}% предвзятости</span>
                <span className={clsx(styles.gridItem, styles.gridItem3)}>{biasPercentage}% нецензурной лексики</span>
                <span className={clsx(styles.gridItem, styles.gridItem4)}>{agitationPercentage}% агитации</span>
            </div>
        </div>
    )
}

export default SiteInfoSummary