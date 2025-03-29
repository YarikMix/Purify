import styles from "./SiteSecurityInfo.module.css"
import {useSiteDomen} from "@pages/hooks/useSiteDomen";

const SiteSecurityInfo = () => {
    const domen = useSiteDomen()
    return (
        <div className={styles.container}>
           <span className={styles.text}>Ресурс {domen} небезопасен для использования.</span>
        </div>
    )
}

export default SiteSecurityInfo