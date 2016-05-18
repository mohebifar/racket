export const port = process.env.PORT || 3000;
export const staticPath = `${__dirname}/../static`;
export const rootDir = `${__dirname}/..`;
export const apiPath = `https://api.evand.ir`;

export const head = {
  titleTemplate: 'Racket: %s',
  meta: [
    {name: 'description', content: 'Scaffold a react universal app with racket'},
    {charset: 'utf-8'},
    {property: 'og:site_name', content: 'Racket'},
    {property: 'og:image', content: '/logo.jpg'},
    {property: 'og:locale', content: 'en_US'},
    {property: 'og:title', content: 'Racket'},
    {property: 'og:description', content: 'Scaffold a react universal app with racket'},
    {property: 'og:card', content: 'summary'},
    {property: 'og:site', content: '@mohebifar'},
    {property: 'og:creator', content: '@mohebifar'},
    {property: 'og:image:width', content: '200'},
    {property: 'og:image:height', content: '200'}
  ]
};
