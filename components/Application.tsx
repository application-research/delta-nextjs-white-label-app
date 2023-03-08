// @ts-nocheck

'use client';

import styles from '@components/Application.module.scss';

import * as React from 'react';
import * as HTTP from '@common/http';
import * as Utilities from '@common/utilities';

import PackageJSON from '@root/package.json';
import DefaultLayout from '@components/DefaultLayout';

import Input from '@components/Input';

const Row = (props) => {
  return (
    <div className={styles.row}>
      <div className={styles.left}>{props.label}</div>
      <div className={styles.right}>{props.children}</div>
    </div>
  );
};

export default function Application(props) {
  const [balance, setBalance] = React.useState({});
  const [deals, setDeals] = React.useState([]);
  const [info, setInfo] = React.useState({});

  React.useEffect(() => {
    async function init() {
      const nextBalance = await HTTP.getBalance({ host: props.host, address: 'f1mmb3lx7lnzkwsvhridvpugnuzo4mq2xjmawvnfi' });
      const nextDeals = await HTTP.getAllDeals({ host: props.host });
      const nextInfo = await HTTP.getInfo({ host: props.host });

      setBalance(nextBalance);
      setDeals(nextDeals);
      setInfo(nextInfo);
    }

    init();
  }, []);

  return (
    <DefaultLayout appTitle={props.name} appVersion={PackageJSON.version}>
      <Row label="Filecoin address">{balance.account}</Row>
      <Row label="Filecoin balance attoFIL">{balance.balance}</Row>
      <Row label="Total end-to-end deals">{info.total_e2e_deals}</Row>
      <Row label="Total end-to-end size">{Utilities.bytesToSize(info.total_e2e_deals_in_bytes)}</Row>
      <Row label="Total import deals">{info.total_import_deals}</Row>
      <Row label="Total import deals in bytes">{Utilities.bytesToSize(info.total_import_deals_in_bytes)}</Row>
      <Row label="Total sealed">{Utilities.bytesToSize(info.total_sealed_deal_in_bytes)}</Row>
      <Row label="Total storage providers">{info.total_miners}</Row>
      {deals.length ? (
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
        <div className={styles.deal}>Loading...</div>
      )}
    </DefaultLayout>
  );
}
