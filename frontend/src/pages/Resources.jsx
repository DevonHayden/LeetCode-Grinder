function Resources() {
  const resources = [
    {
      category: 'Arrays',
      links: [
        { title: 'Two Sum - NeetCode', url: 'https://www.youtube.com/watch?v=KLlXCFG5TnA' },
        { title: 'Best Time to Buy and Sell Stock', url: 'https://www.youtube.com/watch?v=1pkOgXD63yU' },
      ]
    },
    {
      category: 'Trees',
      links: [
        { title: 'Binary Tree Traversal', url: 'https://www.youtube.com/watch?v=fAAZixBzIAI' },
        { title: 'Maximum Depth of Binary Tree', url: 'https://www.youtube.com/watch?v=hTM3phVI6YQ' },
      ]
    },
    {
      category: 'Graphs',
      links: [
        { title: 'Number of Islands', url: 'https://www.youtube.com/watch?v=pV2kpPD66nE' },
        { title: 'BFS and DFS Explained', url: 'https://www.youtube.com/watch?v=pcKY4hjDrxk' },
      ]
    },
    {
      category: 'Dynamic Programming',
      links: [
        { title: 'Dynamic Programming Playlist - NeetCode', url: 'https://www.youtube.com/watch?v=73r3KWiEvyk' },
        { title: 'Climbing Stairs', url: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI' },
      ]
    },
    {
      category: 'General',
      links: [
        { title: 'NeetCode 150 Roadmap', url: 'https://neetcode.io/roadmap' },
        { title: 'Blind 75 List', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions' },
        { title: 'Big O Cheat Sheet', url: 'https://www.bigocheatsheet.com/' },
      ]
    }
  ]

  return (
    <div>
      <h1>Resources</h1>
      <p>Sorted links to help you study each topic</p>
      {resources.map(section => (
        <div key={section.category}>
          <h2>{section.category}</h2>
          {section.links.map(link => (
            <div key={link.title}>
              <a href={link.url} target="_blank" rel="noreferrer">{link.title}</a>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Resources