export interface TopicCard {
  id: string;
  title: string;
  icon: string; // lucide icon name
  short: string;
  example: string;
  exampleOutput: string;
  explanation: string;
}

export const topics: TopicCard[] = [
  {
    id: 'create',
    title: 'Creating & Accessing Sets',
    icon: 'FolderPlus',
    short: 'A set is made with curly braces or set(). Elements are unordered and unique.',
    example: `fruits = {"apple", "banana", "apple"}
print(fruits)
print("banana" in fruits)`,
    exampleOutput: `{'banana', 'apple'}\nTrue`,
    explanation:
      'The duplicate "apple" is removed automatically. Sets do not keep order, so the printed order may differ each time. Use in to check if something is inside.',
  },
  {
    id: 'add-remove',
    title: 'Adding & Removing Elements',
    icon: 'PlusCircle',
    short: 'add() puts one item in, remove() or discard() take it out.',
    example: `colors = {"red", "blue"}
colors.add("green")
colors.discard("red")
print(colors)`,
    exampleOutput: `{'blue', 'green'}`,
    explanation:
      'discard() never crashes if the item is missing, but remove() raises an error. Use pop() to remove a random item, or clear() to empty the set.',
  },
  {
    id: 'union',
    title: 'Union',
    icon: 'Merge',
    short: 'Union joins two sets together — everything in A OR B.',
    example: `A = {1, 2, 3}
B = {3, 4, 5}
print(A | B)
print(A.union(B))`,
    exampleOutput: `{1, 2, 3, 4, 5}\n{1, 2, 3, 4, 5}`,
    explanation:
      'The | operator and .union() do the same thing. Shared items appear only once because sets cannot hold duplicates.',
  },
  {
    id: 'intersection',
    title: 'Intersection',
    icon: 'Gem',
    short: 'Intersection keeps only the items found in BOTH sets.',
    example: `A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A & B)
print(A.intersection(B))`,
    exampleOutput: `{3, 4}\n{3, 4}`,
    explanation:
      'The & operator and .intersection() return the overlap. If nothing is shared, the result is an empty set().',
  },
  {
    id: 'difference',
    title: 'Difference',
    icon: 'MinusCircle',
    short: 'Difference gives items in A that are NOT in B.',
    example: `A = {1, 2, 3, 4}
B = {3, 4, 5}
print(A - B)
print(A.difference(B))`,
    exampleOutput: `{1, 2}\n{1, 2}`,
    explanation:
      'A - B means "A without B". Order matters: B - A would give the items only in B ({5}).',
  },
  {
    id: 'symmetric',
    title: 'Symmetric Difference',
    icon: 'Diff',
    short: 'Items in A or B, but NOT in both — the "outer" parts of the Venn.',
    example: `A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A ^ B)
print(A.symmetric_difference(B))`,
    exampleOutput: `{1, 2, 5, 6}\n{1, 2, 5, 6}`,
    explanation:
      'The ^ operator returns everything except the shared middle. Think of it as "one or the other, but not both".',
  },
  {
    id: 'subset',
    title: 'Subsets & Supersets',
    icon: 'Layers',
    short: 'A subset is fully contained inside another set; a superset contains it.',
    example: `A = {1, 2}
B = {1, 2, 3, 4}
print(A.issubset(B))
print(B.issuperset(A))`,
    exampleOutput: `True\nTrue`,
    explanation:
      'A is a subset of B because every item of A is also in B. B is a superset of A for the same reason.',
  },
  {
    id: 'membership',
    title: 'Membership Testing',
    icon: 'Search',
    short: 'Use in and not in to quickly check if an item exists in a set.',
    example: `nums = {2, 4, 6, 8}
print(4 in nums)
print(5 not in nums)`,
    exampleOutput: `True\nTrue`,
    explanation:
      'Checking membership in a set is extremely fast, even with millions of items — much faster than checking a list.',
  },
  {
    id: 'methods',
    title: 'Set Methods',
    icon: 'Wrench',
    short: 'copy(), update(), pop(), clear(), len() and more built-in helpers.',
    example: `A = {1, 2, 3}
B = {3, 4}
A.update(B)
print(A)
print(len(A))
A.clear()
print(A)`,
    exampleOutput: `{1, 2, 3, 4}\n4\nset()`,
    explanation:
      'update() merges another set in-place. len() counts items. clear() empties the set. copy() makes a separate duplicate.',
  },
];
