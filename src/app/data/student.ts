export interface Student {
    id: number;
    name: string;
    gender: "Male" | "Female";
    present: number;
    permission: number;
    absence: number;
    activityScore: number;
    finalScore: number;
  }
  
  export const students: Student[] = [
    {
      id: 1,
      name: "Kung Norasmey",
      gender: "Male",
      present: 5,
      permission: 5,
      absence: 0,
      activityScore: 10,
      finalScore: 20,
    },
    {
      id: 2,
      name: "Sok Dara",
      gender: "Female",
      present: 4,
      permission: 3,
      absence: 3,
      activityScore: 12,
      finalScore: 18,
    },
    {
      id: 3,
      name: "Chan Pisey",
      gender: "Female",
      present: 6,
      permission: 2,
      absence: 2,
      activityScore: 14,
      finalScore: 22,
    },
    {
      id: 4,
      name: "Vannak Kim",
      gender: "Male",
      present: 7,
      permission: 0,
      absence: 3,
      activityScore: 15,
      finalScore: 25,
    },
    {
      id: 5,
      name: "Lina Sok",
      gender: "Female",
      present: 8,
      permission: 1,
      absence: 1,
      activityScore: 13,
      finalScore: 19,
    },
    {
      id: 6,
      name: "Rathana Chhay",
      gender: "Male",
      present: 6,
      permission: 3,
      absence: 1,
      activityScore: 11,
      finalScore: 23,
    },
    {
      id: 7,
      name: "Srey Leak",
      gender: "Female",
      present: 5,
      permission: 2,
      absence: 3,
      activityScore: 9,
      finalScore: 17,
    },
    {
      id: 8,
      name: "Borey Heang",
      gender: "Male",
      present: 9,
      permission: 0,
      absence: 1,
      activityScore: 18,
      finalScore: 30,
    },
    {
      id: 9,
      name: "Moni Vong",
      gender: "Female",
      present: 7,
      permission: 2,
      absence: 1,
      activityScore: 15,
      finalScore: 28,
    },
    {
      id: 10,
      name: "Vichea Lim",
      gender: "Male",
      present: 8,
      permission: 0,
      absence: 2,
      activityScore: 16,
      finalScore: 27,
    },
  ];
  