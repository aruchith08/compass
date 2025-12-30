
import React from 'react';
import { useRoadmap } from '../RoadmapContext';
import { RoadmapItem } from '../types';

interface KnowledgeGraphProps {
  onItemClick: (item: RoadmapItem) => void;
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ onItemClick }) => {
  const { items } = useRoadmap();
  
  // Organize by Year
  const year1 = items.filter(i => i.year === 1).slice(0, 5); // Limit to avoid clutter
  const year2 = items.filter(i => i.year === 2).slice(0, 5);
  const year3 = items.filter(i => i.year === 3).slice(0, 5);
  const year4 = items.filter(i => i.year === 4).slice(0, 5);

  const columns = [year1, year2, year3, year4];

  // Simple layout calculation
  const colWidth = 200;
  const rowHeight = 100;
  const startX = 50;
  const startY = 50;

  const nodes = columns.flatMap((col, colIdx) => 
     col.map((item, rowIdx) => ({
         id: item.id,
         x: startX + colIdx * colWidth * 1.5,
         y: startY + rowIdx * rowHeight + (colIdx % 2 * 30), // stagger
         data: item
     }))
  );

  // Simple connections: Connect item in Col X to same row in Col X+1 (Arbitrary visual dependency)
  const links: { source: typeof nodes[0], target: typeof nodes[0] }[] = [];
  
  nodes.forEach(node => {
      // Find a node in the next column with matching category if possible
      const colIdx = Math.floor((node.x - startX) / (colWidth * 1.5));
      if (colIdx < 3) {
          const nextColNodes = nodes.filter(n => Math.floor((n.x - startX) / (colWidth * 1.5)) === colIdx + 1);
          const target = nextColNodes.find(n => n.data.category === node.data.category) || nextColNodes[0];
          if (target) {
              links.push({ source: node, target });
          }
      }
  });

  return (
    <div className="w-full h-full overflow-auto custom-scrollbar p-10 bg-slate-900/5 dark:bg-slate-950/50 flex items-center justify-center min-w-[800px]">
        <svg width="1000" height="600" className="overflow-visible">
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" opacity="0.5" />
                </marker>
            </defs>
            {links.map((link, i) => (
                <path 
                    key={i}
                    d={`M ${link.source.x + 20} ${link.source.y + 20} C ${link.source.x + 100} ${link.source.y + 20}, ${link.target.x - 100} ${link.target.y + 20}, ${link.target.x - 20} ${link.target.y + 20}`}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    markerEnd="url(#arrowhead)"
                />
            ))}
            {nodes.map(node => (
                <g 
                    key={node.id} 
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => onItemClick(node.data)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <circle cx="20" cy="20" r="24" className={`${node.data.status === 'Completed' ? 'fill-emerald-500' : 'fill-slate-700'} stroke-4 stroke-white dark:stroke-slate-800 drop-shadow-lg`} />
                    <text x="20" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{node.data.year}</text>
                    
                    <foreignObject x="-60" y="50" width="160" height="60">
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-slate-200 dark:border-white/10 shadow-sm line-clamp-2">
                                {node.data.name}
                            </p>
                        </div>
                    </foreignObject>
                </g>
            ))}
        </svg>
    </div>
  );
};

export default KnowledgeGraph;
