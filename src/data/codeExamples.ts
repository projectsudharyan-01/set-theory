export interface CodeExample {
  op: string;
  code: string;
  output: string;
  explain: string;
}

export const codeExamples: CodeExample[] = [
  {
    op: 'Create a Set',
    code: `# A set of favourite numbers
fav = {3, 7, 7, 11, 15}
print(fav)`,
    output: `{3, 7, 11, 15}`,
    explain:
      'We wrote 7 twice, but sets keep only unique values, so it appears once. Order is not guaranteed.',
  },
  {
    op: 'Add & Remove',
    code: `animals = {"cat", "dog"}
animals.add("fish")
animals.discard("dog")
print(animals)`,
    output: `{'cat', 'fish'}`,
    explain:
      'add() inserts a new item. discard() removes an item quietly — it does nothing if the item is missing.',
  },
  {
    op: 'Union (|)',
    code: `boys = {"Tom", "Sam", "Leo"}
girls = {"Mia", "Sam"}
team = boys | girls
print(team)`,
    output: `{'Tom', 'Mia', 'Sam', 'Leo'}`,
    explain:
      'Union combines both groups. "Sam" appears in both but is listed only once in the result.',
  },
  {
    op: 'Intersection (&)',
    code: `boys = {"Tom", "Sam", "Leo"}
girls = {"Mia", "Sam"}
common = boys & girls
print(common)`,
    output: `{'Sam'}`,
    explain:
      'Only "Sam" is in both sets, so the intersection contains just that name.',
  },
  {
    op: 'Difference (-)',
    code: `boys = {"Tom", "Sam", "Leo"}
girls = {"Mia", "Sam"}
only_boys = boys - girls
print(only_boys)`,
    output: `{'Tom', 'Leo'}`,
    explain:
      'Difference removes any shared names. "Sam" is shared, so it is gone — only Tom and Leo remain.',
  },
  {
    op: 'Symmetric Difference (^)',
    code: `boys = {"Tom", "Sam", "Leo"}
girls = {"Mia", "Sam"}
either = boys ^ girls
print(either)`,
    output: `{'Tom', 'Leo', 'Mia'}`,
    explain:
      'This keeps names that appear in only one of the two sets. "Sam" is in both, so it is dropped.',
  },
  {
    op: 'Subset & Superset',
    code: `small = {1, 2}
big = {1, 2, 3, 4}
print(small.issubset(big))
print(big.issuperset(small))`,
    output: `True\nTrue`,
    explain:
      'Every item of small is inside big, so small is a subset and big is a superset.',
  },
  {
    op: 'Membership (in)',
    code: `vowels = {"a", "e", "i", "o", "u"}
print("a" in vowels)
print("z" not in vowels)`,
    output: `True\nTrue`,
    explain:
      'in returns True if the item exists. not in returns True if it does not exist.',
  },
];
