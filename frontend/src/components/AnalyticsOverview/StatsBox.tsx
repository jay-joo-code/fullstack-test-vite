import React from "react";
import styles from "./AnalyticsOverview.module.css";
import {
  addOn,
  cancel,
  dayRide,
  nightRide,
  noShow,
} from "../../icons/analytics/index";

// enum Icon {
//     AddOn = addOn,
//     Cancel = cancel
// }

export type StatsBoxProps = {
  icon: string;
  stats: number;
  description: string;
};

const StatsBox = ({ icon, stats, description }: StatsBoxProps) => (
  <div className={styles.statsbox}>
    <div className={styles.left}>
      <img className={styles.icon} src={icon} />
    </div>
    <div className={styles.right}>
      <p className={styles.stats}>{stats}</p>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

export default StatsBox;
