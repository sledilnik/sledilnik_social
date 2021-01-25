export default [
  {
    description: 'Trend potrjenih primerov v občini pada.',
    icon: { symbol: '⤵', attr: { role: 'img', ariaLabel: 'down' } },
  },
  {
    description:
      'Ni sprememb v trendu potrjenih primerov (trend v območju -0,03 do +0,03).',
    icon: { symbol: '➖', attr: { role: 'img', ariaLabel: 'neutral' } },
  },
  {
    description: 'Trend potrjenih primerov v občini raste.',
    icon: { symbol: '⤴', attr: { role: 'img', ariaLabel: 'up' } },
  },
  {
    description:
      'Trenda ni mogoče izračunati (ena od vrednosti y1, y2, y3 je enaka 0).',
    icon: {
      symbol: 'brez',
      attr: { role: 'img', ariaLabel: 'no symbol' },
    },
  },
];
