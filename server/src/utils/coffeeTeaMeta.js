export const teaCoffeeTestData = {
  sex: [], // 0 - M, 1 - F
  wakeTime: [], // 0 - before 9AM, 1 - after 9AM
  sleepLength: [], // numeric value - amount of hours sleeping
  age: [], // numeric value - age
  breakfast: [], // 0 - does not have breakfast, 1 - does have breakfast
  employmentState: [], // 0 - neither studies nor works, 1 - studies, 2 - works, 3 - studies and works
  workHours: [], // numeric value - amount of hours at work/college
  travelTimeToWork: [], // numeric value - amount of hours to work/college place
};

/** Training datasets */
/* Distinction: 0 - tea, 1 - coffee */
export const train_dataset = [
  [0, 0, 7, 22, 1, 3, 9, 1], // 0
  [0, 0, 3, 21, 0, 1, 6, 1], // 0
  [1, 0, 9, 55, 1, 2, 10, 1.5], // 1
  [0, 1, 6, 22, 1, 3, 7, 0.8], // 1
  [1, 0, 9, 55, 1, 2, 8, 2], // 1
  [0, 1, 8, 22, 0, 3, 6, 0], // 0
  [0, 1, 10, 23, 1, 1, 3, 2], // 0
  [0, 0, 7, 23, 1, 3, 8, 0.66], // 0
];

export const train_labels = [0, 0, 1, 1, 1, 0, 0, 0];
