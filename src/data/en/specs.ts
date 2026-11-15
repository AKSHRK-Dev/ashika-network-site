export const specsPage = {
  title: 'Server specs',
  heading: 'Server hardware',
  description: 'CPU, memory, storage, network and power of the ASHIKA Network server nodes and of the relay, backup and monitoring systems. The nodes are in a data center in northern Osaka.',
  lead: 'These are the machines (nodes) your servers run on, and the systems that support them. All nodes are in a data center in the Hokusetsu area of northern Osaka.',
  updated: '2026-11-13',
  updatedLabel: 'November 13, 2026',
  nodesHeading: 'Nodes',
  infraHeading: 'Supporting systems',
  infraLead: 'These machines do not run customer servers. They relay traffic, keep backups and monitor the rest.',
  notesHeading: 'Good to know',
  notes: [
    'Standard, High-memory and Next.js plans share a node with other customers. See the pricing table for the memory, CPU and storage of each plan.',
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
      { k: 'Power', v: 'Single power supply' },
      { k: 'Location', v: 'Northern Osaka' },
    ],
  },
  {
    name: 'Node 2',
    id: 'osaka-02',
    specs: [
      { k: 'CPU', v: 'Intel Xeon E5-2696 v4', sub: '22 cores / 44 threads, up to 3.7GHz' },
      { k: 'Memory', v: 'DDR4 32GB' },
      { k: 'Storage', v: 'NVMe SSD 1TB + HDD 3TB' },
      { k: 'Network', v: '1Gbps' },
      { k: 'Power', v: 'Single power supply' },
      { k: 'Location', v: 'Northern Osaka' },
    ],
  },
];

/** Systems other than nodes. They never run customer servers. Shown on /specs only. */
export const infra = [
  {
    name: 'Relay server',
    id: 'relay',
    role: 'The entry point for game, SFTP and similar traffic. It passes it to the nodes over an encrypted WireGuard link.',
    specs: [
      { k: 'CPU', v: 'AMD EPYC (Milan)', sub: '1 virtual core' },
      { k: 'Memory', v: '1GB' },
      { k: 'Storage', v: '30GB' },
      { k: 'Type', v: 'VPS (virtual server)' },
      { k: 'Location', v: 'Japan' },
    ],
  },
  {
    name: 'Backup server',
    id: 'backup',
    role: 'Receives an encrypted backup of the whole infrastructure every day and keeps it at a separate site (Proxmox Backup Server).',
    specs: [
      { k: 'CPU', v: '1 virtual core' },
      { k: 'Memory', v: '2GB' },
      { k: 'Storage', v: '1TB' },
      { k: 'Retention', v: 'Once a day', sub: '7 daily and 4 weekly copies' },
      { k: 'Type', v: 'VPS (virtual server)' },
      { k: 'Location', v: 'Outside Japan' },
    ],
  },
  {
    name: 'Management and monitoring server',
    id: 'mgmt',
    role: 'Monitors every machine and serves Python packages from an internal mirror.',
    specs: [
      { k: 'CPU', v: 'Intel Core i5-7200U', sub: '2 cores / 4 threads, up to 3.1GHz' },
      { k: 'Memory', v: 'DDR4 8GB' },
      { k: 'Storage', v: 'HDD 1TB' },
      { k: 'Power', v: 'Built-in battery' },
      { k: 'Location', v: 'Northern Osaka' },
    ],
  },
];
