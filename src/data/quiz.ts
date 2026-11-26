export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  choices: string[];
  answer: number; // index of correct choice
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Basics',
    question: 'Which of these correctly creates an empty set in Python?',
    choices: ['{ }', 'set()', '( )', '[]'],
    answer: 1,
    explanation:
      '{ } makes an empty dictionary, not a set. To make an empty set you must use set().',
  },
  {
    id: 2,
    topic: 'Basics',
    question: 'What happens if you add the same value to a set twice?',
    choices: [
      'The set stores both copies',
      'The set keeps only one copy',
      'Python raises an error',
      'The value is added at the end',
    ],
    answer: 1,
    explanation:
      'Sets only store unique elements. Adding a duplicate is ignored silently.',
  },
  {
    id: 3,
    topic: 'Basics',
    question: 'Sets are __________ in Python. (Order of elements)',
    choices: ['ordered', 'unordered', 'sorted', 'indexed'],
    answer: 1,
    explanation:
      'Sets are unordered, so the printed order can change between runs. They are also not indexed.',
  },
  {
    id: 4,
    topic: 'Add / Remove',
    question: 'Which method removes an item without raising an error if it is missing?',
    choices: ['remove()', 'discard()', 'pop()', 'delete()'],
    answer: 1,
    explanation:
      'discard() quietly does nothing if the item is missing. remove() raises a KeyError.',
  },
  {
    id: 5,
    topic: 'Union',
    question: 'A = {1,2,3}, B = {3,4,5}. What is A | B?',
    choices: ['{3}', '{1,2,3,4,5}', '{1,2,4,5}', '{1,2,3,3,4,5}'],
    answer: 1,
    explanation:
      'Union combines both sets. The shared 3 appears only once because sets keep unique values.',
  },
  {
    id: 6,
    topic: 'Intersection',
    question: 'A = {1,2,3,4}, B = {3,4,5}. What is A & B?',
    choices: ['{1,2}', '{3,4}', '{1,2,5}', '{1,2,3,4,5}'],
    answer: 1,
    explanation:
      'Intersection returns only the items present in BOTH sets — here {3,4}.',
  },
  {
    id: 7,
    topic: 'Difference',
    question: 'A = {1,2,3,4}, B = {3,4,5}. What is A - B?',
    choices: ['{3,4}', '{5}', '{1,2}', '{1,2,5}'],
    answer: 2,
    explanation:
      'Difference returns items in A that are NOT in B, so {1,2}. Note B - A would give {5}.',
  },
  {
    id: 8,
    topic: 'Symmetric Difference',
    question: 'A = {1,2,3}, B = {3,4,5}. What is A ^ B?',
    choices: ['{3}', '{1,2,4,5}', '{1,2,3,4,5}', '{1,2}'],
    answer: 1,
    explanation:
      'Symmetric difference keeps items in exactly one set — everything except the shared 3.',
  },
  {
    id: 9,
    topic: 'Subset / Superset',
    question: 'A = {1,2}. B = {1,2,3,4}. Which statement is True?',
    choices: [
      'A.issuperset(B)',
      'A.issubset(B)',
      'A is equal to B',
      'B.issubset(A)',
    ],
    answer: 1,
    explanation:
      'All items of A are inside B, so A is a subset of B (and B is a superset of A).',
  },
  {
    id: 10,
    topic: 'Membership',
    question: 'Why is checking "x in my_set" faster than "x in my_list"?',
    choices: [
      'Sets are smaller',
      'Sets use hashing for near-instant lookups',
      'Lists cannot hold the value x',
      'It is not actually faster',
    ],
    answer: 1,
    explanation:
      'Sets use a hash table, so membership checks run in roughly constant time, even for huge sets.',
  },
  {
    id: 11,
    topic: 'Methods',
    question: 'What does A.update(B) do?',
    choices: [
      'Replaces A with B',
      'Removes items of B from A',
      'Adds every item of B into A',
      'Returns a new set',
    ],
    answer: 2,
    explanation:
      'update() merges B into A in-place. It changes A directly rather than returning a new set.',
  },
  {
    id: 12,
    topic: 'Methods',
    question: 'What does len({10, 20, 30}) return?',
    choices: ['2', '3', '6', 'Error'],
    answer: 1,
    explanation: 'len() counts the unique elements in the set — here there are 3.',
  },
];
