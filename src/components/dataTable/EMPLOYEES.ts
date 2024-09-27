export interface EmployeeType {
  firstName: string;
  lastName: string;
  age: number;
  salary: number;
  phoneNumber: string;
  skills: string[];
  role: string;
  inStaff: boolean;
}

export const EMPLOYEES = [
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    salary: 50000,
    phoneNumber: '123-456-7890',
    skills: ['JavaScript', 'React', 'Node.js'],
    role: 'Frontend Developer',
    inStaff: true,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    salary: 60000,
    phoneNumber: '234-567-8901',
    skills: ['HTML', 'CSS', 'JavaScript', 'Angular'],
    role: 'Frontend Developer',
    inStaff: false,
  },
  {
    firstName: 'Emily',
    lastName: 'Johnson',
    age: 35,
    salary: 70000,
    phoneNumber: '345-678-9012',
    skills: ['Python', 'Django', 'PostgreSQL'],
    role: 'Backend Developer',
    inStaff: true,
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    age: 40,
    salary: 90000,
    phoneNumber: '456-789-0123',
    skills: ['Java', 'Spring', 'Hibernate'],
    role: 'Backend Developer',
    inStaff: false,
  },
  {
    firstName: 'Jessica',
    lastName: 'Davis',
    age: 28,
    salary: 65000,
    phoneNumber: '567-890-1234',
    skills: ['JavaScript', 'Vue.js', 'Node.js'],
    role: 'Full Stack Developer',
    inStaff: true,
  },
  {
    firstName: 'David',
    lastName: 'Wilson',
    age: 32,
    salary: 75000,
    phoneNumber: '678-901-2345',
    skills: ['C#', '.NET', 'Azure'],
    role: 'Backend Developer',
    inStaff: true,
  },
  {
    firstName: 'Laura',
    lastName: 'Martinez',
    age: 29,
    salary: 55000,
    phoneNumber: '789-012-3456',
    skills: ['JavaScript', 'React', 'Node.js', 'GraphQL'],
    role: 'Frontend Developer',
    inStaff: false,
  },
  {
    firstName: 'Robert',
    lastName: 'Garcia',
    age: 37,
    salary: 80000,
    phoneNumber: '890-123-4567',
    skills: ['Ruby', 'Rails', 'JavaScript'],
    role: 'Full Stack Developer',
    inStaff: true,
  },
  {
    firstName: 'Sarah',
    lastName: 'Miller',
    age: 33,
    salary: 70000,
    phoneNumber: '901-234-5678',
    skills: ['PHP', 'Laravel', 'MySQL'],
    role: 'Backend Developer',
    inStaff: true,
  },
  {
    firstName: 'James',
    lastName: 'Anderson',
    age: 45,
    salary: 95000,
    phoneNumber: '012-345-6789',
    skills: ['Python', 'Flask', 'AWS'],
    role: 'Backend Developer',
    inStaff: false,
  },
];
