if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import '@root/global.scss';

import Application from '@components/Application';

export default async function Page(props) {
  const host = process.env.API_SOURCE;
  const name = process.env.OWNER;

  return <Application host={host} name={name} />;
}
