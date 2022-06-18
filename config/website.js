const meta = {
  // Metadata
  siteTitle: 'Moeid Heidari - Creative Software Developer',
  siteDescription:
    'Moeid Heidari - Creative software developer who loves modern web technologies.',
  siteTitleAlt: 'Moeid Heidari',
  siteShortName: 'Moeid Heidari',
  siteUrl: 'https://anuraghazru.github.io', // No trailing slash!
};

const social = {
  siteLogo: `src/static/logo.svg`,
  siteBanner: `${meta.siteUrl}/images/social-banner.png`,
  twitter: '@anuraghazru',
};

const website = {
  ...meta,
  ...social,
  disqusShortName: 'moeidheidari',
  googleAnalyticsID: 'UA-119972196-1',
  // Manifest
  themeColor: '#6D83F2',
  backgroundColor: '#6D83F2',
};

module.exports = website;
