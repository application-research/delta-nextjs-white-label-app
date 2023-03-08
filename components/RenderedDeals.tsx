'use client';

import styles from '@components/RenderedDeals.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

const DEAD_TIMESTAMP = '0001-01-01';

export default function RenderedDeals(props) {
  const { deals } = props;

  return deals.length ? (
    deals.map((each) => {
      const isFailed = each.failed || each.slashed;
      const isOnChain = each.onChainAt && !each.onChainAt.startsWith(DEAD_TIMESTAMP);
      const isSealed = each.sealedAt && !each.sealedAt.startsWith(DEAD_TIMESTAMP);

      let style = {};
      if (isFailed) {
        style = { color: 'red' };
      }

      if (isOnChain || isSealed) {
        style = { opacity: 1 };
      }

      return (
        <div className={styles.deal} key={each.ID} style={style}>
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
          {isFailed ? (
            <div className={styles.sub}>
              <strong>↳ failed at</strong>
              {each.failedAt.startsWith(DEAD_TIMESTAMP) ? Utilities.toDateISOString(each.failedAt) : 'n/a'}
            </div>
          ) : null}
          {isOnChain ? (
            <React.Fragment>
              <div className={styles.sub} style={{ color: '#25d366' }}>
                <strong>↳ on-chain at</strong>
                {Utilities.toDateISOString(each.onChainAt)}
              </div>
            </React.Fragment>
          ) : null}
          {isSealed ? (
            <React.Fragment>
              <div className={styles.sub} style={{ color: '#25d366' }}>
                <strong>↳ sealed at</strong>
                {Utilities.toDateISOString(each.sealedAt)}
              </div>
            </React.Fragment>
          ) : null}
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
