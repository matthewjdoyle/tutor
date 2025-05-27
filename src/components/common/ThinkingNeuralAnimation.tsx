import React from 'react';

export const ThinkingNeuralAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-6 p-4 bg-neutral-surface/50 rounded-lg shadow-md">
      <svg 
        width="120" 
        height="100" 
        viewBox="0 0 120 100" 
        className="overflow-visible"
        aria-label="AI processing animation"
      >
        {/* Neural Network Nodes */}
        {[1, 2, 3].map(col => (
          <g key={`col-${col}`}>
            {[1, 2, 3].map(row => (
              <circle 
                key={`node-${col}-${row}`} 
                cx={20 + (col - 1) * 40} 
                cy={20 + (row - 1) * 30} 
                r="8" 
                fill="currentColor"
                className="text-brand-primary opacity-70"
              >
                <animate 
                  attributeName="opacity" 
                  values="0.3;1;0.3" 
                  dur="1.5s" 
                  begin={`${((col -1) * 3 + row -1) * 0.1}s`} 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="r" 
                  values="8;10;8" 
                  dur="1.5s" 
                  begin={`${((col -1) * 3 + row -1) * 0.1 + 0.05}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
            ))}
          </g>
        ))}

        {/* Connecting Lines - simplified representation */}
        {[1, 2].map(startCol => (
          [1, 2, 3].map(startRow => (
            [1, 2, 3].map(endRow => (
              <line 
                key={`line-${startCol}-${startRow}-${endRow}`} 
                x1={20 + (startCol - 1) * 40} 
                y1={20 + (startRow - 1) * 30} 
                x2={20 + startCol * 40} 
                y2={20 + (endRow - 1) * 30} 
                stroke="currentColor"
                className="text-brand-secondary opacity-30"
                strokeWidth="1"
              >
                <animate 
                  attributeName="opacity" 
                  values="0.1;0.5;0.1" 
                  dur="1.8s" 
                  begin={`${((startCol-1)*9 + (startRow-1)*3 + endRow -1) * 0.05}s`} 
                  repeatCount="indefinite" 
                />
              </line>
            ))
          ))
        ))}

        {/* Data Pulse/Spark */}
        <circle cx="20" cy="20" r="3" fill="currentColor" className="text-brand-accent">
          <animateMotion 
            path="M0,0 C20,10 20,20 40,30 S60,50 80,60" 
            dur="2s" 
            repeatCount="indefinite" 
          />
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
        </circle>
         <circle cx="20" cy="50" r="3" fill="currentColor" className="text-brand-accent">
          <animateMotion 
            path="M0,0 C15,5 25,-5 40,0 S65,10 80,0"
            dur="2.2s" 
            begin="0.2s"
            repeatCount="indefinite" 
          />
          <animate attributeName="opacity" values="1;0;1" dur="2.2s" begin="0.2s" repeatCount="indefinite" />
        </circle>
      </svg>
      <p className="mt-3 text-sm text-text-secondary animate-pulse">AI is processing your request...</p>
    </div>
  );
}; 