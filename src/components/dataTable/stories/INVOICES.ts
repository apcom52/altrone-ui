export const INVOICES = [
  {
    description: 'Web Development',
    quantity: 1,
    price: 1500.0,
    date: '2024-01-15',
    currency: 'USD',
    location: 'New York, NY',
  },
  {
    description: 'Graphic Design',
    quantity: 3,
    price: 300.0,
    date: '2024-01-20',
    currency: 'EUR',
    location: 'Los Angeles, CA',
  },
  {
    description: 'SEO Services',
    quantity: 1,
    price: 1200.0,
    date: '2024-02-05',
    currency: 'GBP',
    location: 'Chicago, IL',
  },
  {
    description: 'Content Creation',
    quantity: 5,
    price: 200.0,
    date: '2024-02-10',
    currency: 'AUD',
    location: 'Austin, TX',
  },
  {
    description: 'Social Media Management',
    quantity: 6,
    price: 250.0,
    date: '2024-02-15',
    currency: 'CAD',
    location: 'San Francisco, CA',
  },
  {
    description: 'Email Marketing Campaign',
    quantity: 2,
    price: 500.0,
    date: '2024-03-01',
    currency: 'JPY',
    location: 'Seattle, WA',
  },
  {
    description: 'Consulting Services',
    quantity: 4,
    price: 400.0,
    date: '2024-03-05',
    currency: 'CHF',
    location: 'Denver, CO',
  },
  {
    description: 'Logo Design',
    quantity: 1,
    price: 700.0,
    date: '2024-03-10',
    currency: 'NZD',
    location: 'Miami, FL',
  },
  {
    description: 'Photography Services',
    quantity: 2,
    price: 600.0,
    date: '2024-03-15',
    currency: 'SEK',
    location: 'Orlando, FL',
  },
  {
    description: 'Website Maintenance',
    quantity: 12,
    price: 100.0,
    date: '2024-04-01',
    currency: 'NOK',
    location: 'Atlanta, GA',
  },
  {
    description: 'Copywriting Services',
    quantity: 5,
    price: 150.0,
    date: '2024-04-10',
    currency: 'MXN',
    location: 'Phoenix, AZ',
  },
  {
    description: 'Video Editing',
    quantity: 1,
    price: 800.0,
    date: '2024-04-15',
    currency: 'HKD',
    location: 'Boston, MA',
  },
  {
    description: 'Brand Strategy',
    quantity: 1,
    price: 1200.0,
    date: '2024-05-01',
    currency: 'SGD',
    location: 'Philadelphia, PA',
  },
  {
    description: 'E-commerce Setup',
    quantity: 1,
    price: 2000.0,
    date: '2024-05-05',
    currency: 'ZAR',
    location: 'Dallas, TX',
  },
  {
    description: 'UX/UI Design',
    quantity: 2,
    price: 900.0,
    date: '2024-05-10',
    currency: 'BRL',
    location: 'Portland, OR',
  },
];

export const INVOICES2 = [
  {
    amount: 250.75,
    date: '2024-10-18',
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
      },
    ],
    tags: ['finance', 'monthly'],
    isPaid: true,
  },
  {
    amount: 149.99,
    date: '2024-09-20',
    users: [
      {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice@example.com',
      },
      {
        id: 4,
        name: 'Bob Brown',
        email: 'bob@example.com',
      },
    ],
    tags: ['subscription', 'recurring'],
    isPaid: false,
  },
  {
    amount: 500.0,
    date: '2024-08-15',
    users: [
      {
        id: 5,
        name: 'Charlie Davis',
        email: 'charlie@example.com',
      },
      {
        id: 6,
        name: 'Diana Evans',
        email: 'diana@example.com',
      },
    ],
    tags: ['investment', 'one-time'],
    isPaid: true,
  },
  {
    amount: 75.5,
    date: '2024-07-01',
    users: [
      {
        id: 7,
        name: 'Emily Foster',
        email: 'emily@example.com',
      },
      {
        id: 8,
        name: 'Frank Green',
        email: 'frank@example.com',
      },
    ],
    tags: ['utilities', 'electricity'],
    isPaid: false,
  },
  {
    amount: 399.99,
    date: '2024-06-25',
    users: [
      {
        id: 9,
        name: 'Grace Hall',
        email: 'grace@example.com',
      },
      {
        id: 10,
        name: 'Henry Ingram',
        email: 'henry@example.com',
      },
    ],
    tags: ['purchase', 'electronics'],
    isPaid: true,
  },
  {
    amount: 89.99,
    date: '2024-05-14',
    users: [
      {
        id: 11,
        name: 'Ivy Johnson',
        email: 'ivy@example.com',
      },
      {
        id: 12,
        name: 'Jack King',
        email: 'jack@example.com',
      },
    ],
    tags: ['subscription', 'yearly'],
    isPaid: false,
  },
  {
    amount: 1200.0,
    date: '2024-04-30',
    users: [
      {
        id: 13,
        name: 'Laura Lee',
        email: 'laura@example.com',
      },
      {
        id: 14,
        name: 'Mike Miller',
        email: 'mike@example.com',
      },
    ],
    tags: ['rent', 'apartment'],
    isPaid: true,
  },
  {
    amount: 55.75,
    date: '2024-03-19',
    users: [
      {
        id: 15,
        name: 'Nancy Oliver',
        email: 'nancy@example.com',
      },
      {
        id: 16,
        name: 'Oscar Parker',
        email: 'oscar@example.com',
      },
    ],
    tags: ['utilities', 'water'],
    isPaid: false,
  },
  {
    amount: 299.99,
    date: '2024-02-28',
    users: [
      {
        id: 17,
        name: 'Paula Quinn',
        email: 'paula@example.com',
      },
      {
        id: 18,
        name: 'Robert Stone',
        email: 'robert@example.com',
      },
    ],
    tags: ['purchase', 'furniture'],
    isPaid: true,
  },
  {
    amount: 45.0,
    date: '2024-01-17',
    users: [
      {
        id: 19,
        name: 'Sophia Taylor',
        email: 'sophia@example.com',
      },
      {
        id: 20,
        name: 'Thomas Walker',
        email: 'thomas@example.com',
      },
    ],
    tags: ['subscription', 'monthly'],
    isPaid: false,
  },
  {
    amount: 175.25,
    date: '2023-12-05',
    users: [
      {
        id: 21,
        name: 'Uma Wilson',
        email: 'uma@example.com',
      },
      {
        id: 22,
        name: 'Victor Young',
        email: 'victor@example.com',
      },
    ],
    tags: ['finance', 'loan'],
    isPaid: true,
  },
  {
    amount: 600.0,
    date: '2023-11-23',
    users: [
      {
        id: 23,
        name: 'Wendy Adams',
        email: 'wendy@example.com',
      },
      {
        id: 24,
        name: 'Xander Bell',
        email: 'xander@example.com',
      },
    ],
    tags: ['purchase', 'home appliance'],
    isPaid: false,
  },
  {
    amount: 99.99,
    date: '2023-10-11',
    users: [
      {
        id: 25,
        name: 'Yara Clark',
        email: 'yara@example.com',
      },
      {
        id: 26,
        name: 'Zach Davis',
        email: 'zach@example.com',
      },
    ],
    tags: ['subscription', 'gaming'],
    isPaid: true,
  },
  {
    amount: 350.0,
    date: '2023-09-07',
    users: [
      {
        id: 27,
        name: 'Anna Evans',
        email: 'anna@example.com',
      },
      {
        id: 28,
        name: 'Ben Foster',
        email: 'ben@example.com',
      },
    ],
    tags: ['investment', 'quarterly'],
    isPaid: false,
  },
  {
    amount: 45.5,
    date: '2023-08-15',
    users: [
      {
        id: 29,
        name: 'Chris Green',
        email: 'chris@example.com',
      },
      {
        id: 30,
        name: 'Diana Hall',
        email: 'diana@example.com',
      },
    ],
    tags: ['utilities', 'gas'],
    isPaid: true,
  },
  {
    amount: 275.0,
    date: '2023-07-26',
    users: [
      {
        id: 31,
        name: 'Ethan Ingram',
        email: 'ethan@example.com',
      },
      {
        id: 32,
        name: 'Fiona Johnson',
        email: 'fiona@example.com',
      },
    ],
    tags: ['finance', 'debt repayment'],
    isPaid: false,
  },
  {
    amount: 525.75,
    date: '2023-06-12',
    users: [
      {
        id: 33,
        name: 'George King',
        email: 'george@example.com',
      },
      {
        id: 34,
        name: 'Holly Lee',
        email: 'holly@example.com',
      },
    ],
    tags: ['purchase', 'vacation'],
    isPaid: true,
  },
  {
    amount: 60.0,
    date: '2023-05-03',
    users: [
      {
        id: 35,
        name: 'Isaac Miller',
        email: 'isaac@example.com',
      },
      {
        id: 36,
        name: 'Julia Nelson',
        email: 'julia@example.com',
      },
    ],
    tags: ['subscription', 'fitness'],
    isPaid: false,
  },
  {
    amount: 199.95,
    date: '2023-04-18',
    users: [
      {
        id: 37,
        name: 'Kevin Oliver',
        email: 'kevin@example.com',
      },
      {
        id: 38,
        name: 'Lilly Parker',
        email: 'lilly@example.com',
      },
    ],
    tags: ['purchase', 'clothing'],
    isPaid: true,
  },
  {
    amount: 89.5,
    date: '2023-03-22',
    users: [
      {
        id: 39,
        name: 'Martin Quinn',
        email: 'martin@example.com',
      },
      {
        id: 40,
        name: 'Nina Stone',
        email: 'nina@example.com',
      },
    ],
    tags: ['subscription', 'music'],
    isPaid: false,
  },
];
