/**
 * 英語版の「自分で用意する場合」との比較（src/data/compare.ts の英語版）。
 */
export const alternatives = {
  title: 'Rent one, or set it up yourself',
  lead: 'You could run it on your own PC, or rent a pay-as-you-go cloud. Here is how they differ.',
  columns: ['ASHIKA Network', 'Your own PC', 'Pay-as-you-go cloud'],
  scrollHint: 'Scroll sideways to see the other options',
  itemAria: 'Item',
  selfColumn: 0,
  rows: [
    { label: 'Monthly cost', cells: ['From ¥30. Flat rate', 'Electricity and wear on the PC', 'Pay for what you use. Hard to predict'] },
    { label: 'Upfront cost', cells: ['None', 'Buying the PC', 'A few thousand yen and up'] },
    { label: 'How you pay', cells: ['From your topped-up balance', '—', 'Credit card, sometimes in dollars'] },
    { label: 'Running 24/7', cells: ['Just runs', 'Leave the PC on', 'Just runs'] },
    { label: 'When it crashes', cells: ['Restarts by itself', 'You notice and fix it', 'Depends on your setup'] },
    { label: 'Reaching it from outside', cells: ['Connection details on purchase', 'Port forwarding and other setup', 'Depends on the region'] },
    { label: 'Time to get started', cells: ['Minutes after buying', 'Getting and setting up a PC', 'Creating an account and building the setup'] },
    { label: 'When you are done', cells: ['Ends with the contract period', 'You still have the PC', 'Remember to delete everything'] },
  ],
  notes: ['All prices include tax. The comparison shows typical cases and varies by setup and provider.'],
};

export const vsLabels = { before: 'Before', after: 'With ASHIKA Network' };
