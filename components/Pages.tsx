'use client';

import styles from '@components/Pages.module.scss';

import * as React from 'react';

export default function Pages(props) {
  const objects = [];
  let j = 0;
  for (let i = 0; i < props.total; i += props.count) {
    j += 1;
    objects.push(j);
  }

  return (
    <div className={styles.row}>
      <div className={styles.left}>Rendered per page: {props.count}</div>
      <div className={styles.right}>
        {objects.map((each) => {
          return (
            <span
              className={styles.page}
              key={each}
              style={props.selected === each ? { background: '#0047FF', color: '#fff' } : null}
              onClick={
                props.selected !== each
                  ? () => {
                      props.onSetDeals(each);
                    }
                  : () => {}
              }
            >
              {each}
            </span>
          );
        })}
      </div>
    </div>
  );
}
