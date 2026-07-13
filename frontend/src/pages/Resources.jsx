import {useState} from 'react'

function Resources() {
  const [filterType, setFilterType] = useState('all')
  const resources = [
    {
      category: 'Arrays',
      links: [
        { title: 'Two Sum - NeetCode', url: 'https://www.youtube.com/watch?v=KLlXCFG5TnA', type: 'video' },
        { title: 'Best Time to Buy and Sell Stock', url: 'https://www.youtube.com/watch?v=1pkOgXD63yU', type: 'video' },
      ]
    },
    {
      category: 'Trees',
      links: [
        { title: 'Binary Tree Traversal', url: 'https://www.youtube.com/watch?v=fAAZixBzIAI', type: 'video' },
        { title: 'Maximum Depth of Binary Tree', url: 'https://www.youtube.com/watch?v=hTM3phVI6YQ', type: 'video' },
      ]
    },
    {
      category: 'Graphs',
      links: [
        { title: 'Number of Islands', url: 'https://www.youtube.com/watch?v=pV2kpPD66nE', type: 'video' },
        { title: 'BFS and DFS Explained', url: 'https://www.youtube.com/watch?v=pcKY4hjDrxk', type: 'video' },
      ]
    },
    {
      category: 'Dynamic Programming',
      links: [
        { title: 'Dynamic Programming Playlist - NeetCode', url: 'https://www.youtube.com/watch?v=73r3KWiEvyk', type: 'video' },
        { title: 'Climbing Stairs', url: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI', type: 'video' },
      ]
    },
    {
      category: 'General',
      links: [
        { title: 'NeetCode 150 Roadmap', url: 'https://neetcode.io/roadmap', type: 'article' },
        { title: 'Blind 75 List', url: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions', type: 'article' },
        { title: 'Big O Cheat Sheet', url: 'https://www.bigocheatsheet.com/', type: 'article' },
      ]
    }
  ]

  const filteredResources = resources.map(section => ({
    ...section,
    links: section.links.filter(link => filterType === 'all' || link.type === filterType)
  })).filter(section => section.links.length > 0)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-300 mb-2">Resources</h1>
      <p className="text-gray-400 mb-6">Curated links to help you study each topic</p>
      <div className="mb-6 bg-gray-300 border border-gray-300 rounded-lg p-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-lg p-2"
        >
          <option value="all">All Types</option>
          <option value="video">Videos</option>
          <option value="article">Articles</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredResources.map(section => (
          <div key={section.category} className="bg-gray-300 border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-800 mb-3">{section.category}</h2>
            <div className="flex flex-col gap-2">
              {section.links.map(link => (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-700 hover:text-orange-900 hover:underline"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resources