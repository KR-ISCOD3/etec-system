export interface ClassItem {
    id: number;
    title: string;
    lesson: string;
    totalStudent: number;
    location: string;
    status: string;
  }
  
export const classData: ClassItem[] = [
  {
    id: 1,
    title: "Web Developer",
    lesson: "Introduction",
    totalStudent: 12,
    location: "ETEC-3",
    status: "Physical",
  },
  {
    id: 2,
    title: "Graphic Design",
    lesson: "Photoshop Basics",
    totalStudent: 10,
    location: "ETEC-1",
    status: "Online",
  },
  {
    id: 3,
    title: "Digital Marketing",
    lesson: "SEO Intro",
    totalStudent: 15,
    location: "ETEC-2",
    status: "Physical",
  },
  {
    id: 4,
    title: "Accounting",
    lesson: "QuickBooks Setup",
    totalStudent: 11,
    location: "ETEC-4",
    status: "Online",
  },
  {
    id: 5,
    title: "Network Security",
    lesson: "Firewall Basics",
    totalStudent: 9,
    location: "ETEC-1",
    status: "Physical",
  },
  {
    id: 6,
    title: "MS Office",
    lesson: "Excel Formulas",
    totalStudent: 13,
    location: "ETEC-3",
    status: "Physical",
  },
  {
    id: 7,
    title: "Programming C++",
    lesson: "Syntax & Loops",
    totalStudent: 8,
    location: "ETEC-2",
    status: "Online",
  },
  {
    id: 8,
    title: "Python Basics",
    lesson: "Data Types",
    totalStudent: 14,
    location: "ETEC-4",
    status: "Physical",
  },
  {
    id: 9,
    title: "Video Editing",
    lesson: "Premiere Pro Setup",
    totalStudent: 10,
    location: "ETEC-2",
    status: "Online",
  },
  {
    id: 10,
    title: "UI/UX Design",
    lesson: "Wireframes",
    totalStudent: 16,
    location: "ETEC-3",
    status: "Physical",
  },
];
  