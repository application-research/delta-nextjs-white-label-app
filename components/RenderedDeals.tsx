'use client';

import styles from '@components/RenderedDeals.module.scss';

import * as React from 'react';

export default function RenderedDeals(props) {
  const { deals } = props;

  return deals.length ? (
    deals.map((each) => {
      return (
        <div className={styles.deal} key={each.ID} style={each.failed ? { color: 'red' } : null}>
          <div className={styles.property}>{each.ID}</div>
          <div className={styles.sub}>
            <strong>↳ CID</strong>
            {each.propCid}
          </div>
          <div className={styles.sub}>
            <strong>↳ content ID</strong>
            {each.content}
          </div>
          {each.dealId > 0 ? (
            <div className={styles.sub}>
              <strong>↳ deal ID</strong>
              {each.dealId}
            </div>
          ) : null}
          <div className={styles.sub}>
            <strong>↳ deal UUID</strong>
            {each.dealUuid}
          </div>
          <div className={styles.sub}>
            <strong>↳ protocol version</strong>
            {each.deal_protocol_version}
          </div>
          <div className={styles.sub}>
            <strong>↳ storage provider</strong>
            {each.miner}
          </div>
          {each.failed ? (
            <div className={styles.sub}>
              <strong>↳ failed at</strong>
              {each.failedAt}
            </div>
          ) : (
            <div className={styles.sub} style={{ color: '#25d366' }}>
              <strong>↳ on chain at</strong>
              {each.onChainAt}
            </div>
          )}
        </div>
      );
    })
  ) : (
    <div className={styles.deal}>
      <span className={styles.spinner2} />
      &nbsp;Loading all of the data ...
    </div>
  );
}
