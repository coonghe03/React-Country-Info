import { rest } from 'msw';

export const handlers = [
  rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: { common: 'United States' }, cca3: 'USA', region: 'Americas', population: 331000000, capital: ['Washington, D.C.'], flags: { svg: 'usa_flag_url' }, languages: { eng: 'English' } },
        { name: { common: 'Canada' }, cca3: 'CAN', region: 'Americas', population: 37700000, capital: ['Ottawa'], flags: { svg: 'canada_flag_url' }, languages: { eng: 'English', fra: 'French' } },
      ])
    );
  }),
  // You can mock other endpoints similarly...
];
