const timesByTerm: Record<string, string[]> = {
    "Mon-Thu": [
      "09:00(AM) - 10:30(AM)",
      "11:00(AM) - 12:15(PM)",
      "12:15(PM) - 01:45(PM)",
      "02:00(PM) - 03:15(PM)",
      "03:30(PM) - 05:00(PM)",
      "06:00(PM) - 07:15(PM)",
      "07:30(PM) - 08:30(PM)",
    ],
    "Sat-Sun": [
      "08:00(AM) - 11:00(AM)",
      "11:00(AM) - 01:30(PM)",
      "02:00(PM) - 05:00(PM)",
    ],
    custom: [
      "09:00(AM) - 10:30(AM)",
      "11:00(AM) - 12:15(PM)",
    ],
  };
  
  export default timesByTerm;
  