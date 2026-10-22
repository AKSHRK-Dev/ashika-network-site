export const specsPage = {
  title: 'Server specs',
  heading: 'Server hardware',
  description: 'CPU, memory, storage, network and power of the ASHIKA Network server nodes, all in a data center in northern Osaka.',
  lead: 'These are the machines (nodes) your servers run on. All of them are in a data center in the Hokusetsu area of northern Osaka.',
  updated: '2026-10-22',
  updatedLabel: 'October 22, 2026',
  nodesHeading: 'Nodes',
  notesHeading: 'Good to know',
  notes: [
    'Standard and High-memory plans share a node with other customers. See the pricing table for the memory, CPU and storage of each plan.',
    'We decide which node runs your server, so there is nothing to choose when you buy.',
    'We update this page when we replace or add hardware.',
  ],
  plansLink: 'See pricing and plans',
  homeLink: 'Full specs',
};

export const nodes = [
  {
    name: 'Node 1',
    id: 'osaka-01',
    specs: [
      { k: 'CPU', v: 'AMD Ryzen 5 4500', sub: '6 cores / 12 threads, up to 4.1GHz' },
      { k: 'Memory', v: 'DDR4 32GB' },
      { k: 'Storage', v: 'HDD 3TB' },
      { k: 'Network', v: '1Gbps' },
      { k: 'Power', v: 'Redundant power supply' },
      { k: 'Location', v: 'Northern Osaka' },
    ],
  },
  {
    name: 'Node 2',
    id: 'osaka-02',
    specs: [
      { k: 'CPU', v: 'Intel Xeon E5-2696 v4', sub: '22 cores / 44 threads, up to 3.7GHz' },
      { k: 'Memory', v: 'DDR4 48GB' },
      { k: 'Storage', v: 'NVMe SSD 1TB + HDD 3TB' },
      { k: 'Network', v: '1Gbps' },
      { k: 'Power', v: 'Redundant power supply' },
      { k: 'Location', v: 'Northern Osaka' },
    ],
  },
];
