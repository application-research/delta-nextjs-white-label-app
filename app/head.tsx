import DefaultMetaTags from '@components/DefaultMetaTags';
import PackageJSON from '@root/package.json';

export default async function Head({ params }) {
  const title = `${process.env.OWNER}`;
  const description = `A delta node being run for ${process.env.OWNER}.`;
  const url = 'https://registry.delta.store';

  // SUMMARY_LARGE_IMAGE: 1500x785
  return (
    <>
      <title>{title}</title>
      <DefaultMetaTags />
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://next-s3-public.s3.us-west-2.amazonaws.com/social/meta-delta-logo.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="https://next-s3-public.s3.us-west-2.amazonaws.com/social/meta-delta-logo.png" />
    </>
  );
}
