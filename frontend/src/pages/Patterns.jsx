function Patterns() {
  const patterns = [
    {
      name: 'Sliding Window',
      description: 'Used for problems involving subarrays or substrings of a fixed or variable size. Maintain a window that slides across the array.',
      whenToUse: 'When asked for max/min subarray, substring with condition, or contiguous elements.',
      example: 'Maximum sum subarray of size k, Longest substring without repeating characters'
    },
    {
      name: 'Two Pointers',
      description: 'Use two pointers moving towards each other or in the same direction to solve array/string problems in O(n).',
      whenToUse: 'Sorted arrays, palindrome checks, pair sum problems.',
      example: 'Two Sum II, Valid Palindrome, Container With Most Water'
    },
    {
      name: 'Binary Search',
      description: 'Divide and conquer approach for sorted arrays. Eliminates half the search space each iteration.',
      whenToUse: 'Sorted array, find target, find boundary condition.',
      example: 'Search in Rotated Array, Find Minimum in Rotated Array'
    },
    {
      name: 'BFS',
      description: 'Breadth First Search explores nodes level by level using a queue. Best for shortest path problems.',
      whenToUse: 'Shortest path, level order traversal, spread problems.',
      example: 'Binary Tree Level Order, Shortest Path in Grid, Rotting Oranges'
    },
    {
      name: 'DFS',
      description: 'Depth First Search explores as far as possible before backtracking. Uses recursion or a stack.',
      whenToUse: 'Tree traversal, path finding, connected components.',
      example: 'Number of Islands, Path Sum, Clone Graph'
    },
    {
      name: 'Dynamic Programming',
      description: 'Break problem into subproblems and store results to avoid recomputation. Bottom-up or top-down.',
      whenToUse: 'Optimization problems, count ways, overlapping subproblems.',
      example: 'Climbing Stairs, Longest Common Subsequence, Coin Change'
    },
    {
      name: 'Backtracking',
      description: 'Try all possibilities recursively and undo choices that lead to invalid solutions.',
      whenToUse: 'Permutations, combinations, constraint satisfaction.',
      example: 'Subsets, Permutations, N-Queens'
    }
  ]

  return (
    <div>
      <h1 className ="text-3xl font-bold text-gray-300 mb-2">Patterns Cheat Sheet</h1>
      <p className="text-gray-400 mb-6">Common LeetCode patterns to recognize during interviews</p>
      <div className="grid grid-cols-1 gap-4">
      {patterns.map(pattern => (
        <div key={pattern.name} className="bg-gray-300 border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-bold text-green-800 mb-2">{pattern.name}</h2>
          <p className="mb-2"><strong className="text-gray-700">What it is:</strong> {pattern.description}</p>
          <p className="mb-2"><strong className="text-gray-700">When to use:</strong> {pattern.whenToUse}</p>
          <p><strong className="text-gray-700">Examples:</strong> {pattern.example}</p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Patterns