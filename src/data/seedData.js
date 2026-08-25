// PLACEHOLDER DATA — replace with her real class list, schedule,
// and dates once you have them. Search "REPLACE ME" to find every spot.

export const SUBJECTS = [
  { id: 'eng', name: 'English', color: '#93365F', priority: true },
  { id: 'cs', name: 'Computer Science', color: '#3B6E91', priority: true },
  { id: 'math', name: 'Math', color: '#5C7F63', priority: false },
  { id: 'science', name: 'Science', color: '#C97C3B', priority: false },
  { id: 'history', name: 'World Cultures', color: '#7A5C91', priority: false },
  { id: 'spanish', name: 'Spanish', color: '#B0793E', priority: false },
];

// REPLACE ME: real weekly schedule (supports A/B day rotations —
// just add a second schedule object and a toggle if needed)
export const SCHEDULE = {
  Monday: [
    { period: 1, subject: 'eng', time: '8:00–8:50' },
    { period: 2, subject: 'math', time: '8:55–9:45' },
    { period: 3, subject: 'science', time: '9:50–10:40' },
    { period: 4, subject: 'cs', time: '10:45–11:35' },
    { period: 5, subject: 'history', time: '12:20–1:10' },
    { period: 6, subject: 'spanish', time: '1:15–2:05' },
  ],
  Tuesday: [
    { period: 1, subject: 'eng', time: '8:00–8:50' },
    { period: 2, subject: 'math', time: '8:55–9:45' },
    { period: 3, subject: 'science', time: '9:50–10:40' },
    { period: 4, subject: 'cs', time: '10:45–11:35' },
    { period: 5, subject: 'history', time: '12:20–1:10' },
    { period: 6, subject: 'spanish', time: '1:15–2:05' },
  ],
  Wednesday: [
    { period: 1, subject: 'eng', time: '8:00–8:50' },
    { period: 2, subject: 'math', time: '8:55–9:45' },
    { period: 3, subject: 'science', time: '9:50–10:40' },
    { period: 4, subject: 'cs', time: '10:45–11:35' },
    { period: 5, subject: 'history', time: '12:20–1:10' },
    { period: 6, subject: 'spanish', time: '1:15–2:05' },
  ],
  Thursday: [
    { period: 1, subject: 'eng', time: '8:00–8:50' },
    { period: 2, subject: 'math', time: '8:55–9:45' },
    { period: 3, subject: 'science', time: '9:50–10:40' },
    { period: 4, subject: 'cs', time: '10:45–11:35' },
    { period: 5, subject: 'history', time: '12:20–1:10' },
    { period: 6, subject: 'spanish', time: '1:15–2:05' },
  ],
  Friday: [
    { period: 1, subject: 'eng', time: '8:00–8:50' },
    { period: 2, subject: 'math', time: '8:55–9:45' },
    { period: 3, subject: 'science', time: '9:50–10:40' },
    { period: 4, subject: 'cs', time: '10:45–11:35' },
    { period: 5, subject: 'history', time: '12:20–1:10' },
    { period: 6, subject: 'spanish', time: '1:15–2:05' },
  ],
};

// REPLACE ME: real homework
export const SEED_HOMEWORK = [
  { id: 'hw1', subject: 'eng', title: 'Read Ch. 4 and annotate', dueDate: addDays(2), done: false },
  { id: 'hw2', subject: 'cs', title: 'Finish loops worksheet', dueDate: addDays(1), done: false },
  { id: 'hw3', subject: 'math', title: 'Problem set 6', dueDate: addDays(3), done: false },
];

// REPLACE ME: real exam dates
export const SEED_EXAMS = [
  { id: 'ex1', subject: 'science', title: 'Unit 2 Test', date: addDays(6) },
  { id: 'ex2', subject: 'history', title: 'World Cultures Quiz', date: addDays(3) },
];

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
