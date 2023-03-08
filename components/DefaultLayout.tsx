import styles from '@components/DefaultLayout.module.scss';

import * as React from 'react';

export default function DefaultLayout(props) {
  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.title}>{props.appTitle}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.version}>{props.appVersion}</div>
        </div>
      </div>
      <div className={styles.bottom}>{props.children}</div>
    </div>
  );
}
