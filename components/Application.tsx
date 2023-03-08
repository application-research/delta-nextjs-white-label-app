// @ts-nocheck

'use client';

import styles from '@components/Application.module.scss';

import * as React from 'react';
import * as HTTP from '@common/http';
import * as Utilities from '@common/utilities';
import * as Filecoin from '@common/filecoin';

import PackageJSON from '@root/package.json';
import DefaultLayout from '@components/DefaultLayout';
import RenderedDeals from '@components/RenderedDeals';
import Pages from '@components/Pages';

import Input from '@components/Input';

const DEALS_PER_PAGE = 2500;
const STARTING_PAGE = 1;

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
  const [selected, setSelected] = React.useState(1);

  React.useEffect(() => {
    async function init() {
      const nextBalance = await HTTP.getBalance({ host: props.host, address: 'f1mmb3lx7lnzkwsvhridvpugnuzo4mq2xjmawvnfi' });
      const nextInfo = await HTTP.getInfo({ host: props.host });
      const nextDeals = await HTTP.getDeals({ host: props.host, page: STARTING_PAGE, count: DEALS_PER_PAGE });
      setDeals(nextDeals);

      setBalance(nextBalance);
      setInfo(nextInfo);
    }

    init();
  }, []);

  console.log(balance);

  return (
    <DefaultLayout appTitle={props.name} appVersion={PackageJSON.version}>
      <Row label="Filecoin address">{balance.account}</Row>
      <Row label="Filecoin balance">{Filecoin.convertAttoFILtoFIL(balance.balance)} FIL</Row>
      <Row label="Datacap balance">{Utilities.bytesToSize(balance.verified_client_balance)}</Row>
      <Row label="Total end-to-end deals">{info.total_e2e_deals}</Row>
      <Row label="Total end-to-end size">{Utilities.bytesToSize(info.total_e2e_deals_in_bytes)}</Row>
      <Row label="Total import deals">{info.total_import_deals}</Row>
      <Row label="Total import deals in bytes">{Utilities.bytesToSize(info.total_import_deals_in_bytes)}</Row>
      <Row label="Total sealed">{Utilities.bytesToSize(info.total_sealed_deal_in_bytes)}</Row>
      <Row label="Total storage providers">{info.total_miners}</Row>
      <Pages
        total={info.total_e2e_deals + info.total_import_deals}
        count={DEALS_PER_PAGE}
        selected={selected}
        onSetDeals={async (page) => {
          setSelected(page);
          setDeals([]);
          const nextDeals = await HTTP.getDeals({ host: props.host, page, count: DEALS_PER_PAGE });
          setDeals(nextDeals);
        }}
      />
      <RenderedDeals deals={deals} />
    </DefaultLayout>
  );
}
