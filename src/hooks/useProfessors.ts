import { useState, useEffect } from 'react';

// Type expected by the UI components
export type Professor = {
  id: string;
  name: string;
  title: string;
  portrait: string;
  bio: string; // Consider if this should be different from title
  tips: string[];
};

// Type matching the structure in teaching_tips.json
type ProfessorData = {
  name: string;
  title: string;
  tip: string;
};

// Mapping from extracted name (lowercase, hyphenated) to image filename base
const imageNameMap: { [key: string]: string } = {
  'david-der-wei-wang': 'wang',
  'abe-ryuichi': 'tanaka', // Special case: Abe Ryuichi uses tanaka.png
  'peter-k.-bol': 'bol',
  'tomiko-yoda': 'yoda',
  'sun-joo-kim': 'kim',
  'jie-li': 'li',
  'janet-gyatso': 'gyatso',
};

// Function to get the image path based on the extracted name
function getImagePath(name: string): string {
  const id = name.toLowerCase().replace(/\s+/g, '-').replace(/\.([^-]|$)/g, '$1');
  const filenameBase = imageNameMap[id] || name.split(' ').pop()?.toLowerCase() || 'unknown';
  const extension = filenameBase === 'tanaka' ? 'png' : 'jpg';
  return `/img/${filenameBase}.${extension}`;
}

// Function to process the raw tip string into an array of strings
function processTip(tip: string): string[] {
  if (!tip) return [];

  // Regex to find numbered list items (captures the number and the text)
  const numberedListRegex = /(\d+)\.\s+([\s\S]*?)(?=\n\d+\.\s+|\n*$)/g;
  let matches;
  const extractedTips: string[] = [];

  // Check if it looks like a numbered list
  if (/^\s*1\.\s+/m.test(tip)) {
      while ((matches = numberedListRegex.exec(tip)) !== null) {
          // matches[2] contains the text of the tip, [\s\S]*? handles multi-line content non-greedily
          extractedTips.push(matches[2].trim());
      }
  }

  // If regex found tips, use them
  if (extractedTips.length > 0) {
      return extractedTips.filter(Boolean); // Ensure no empty strings remain
  }
  // Check for bullet points (secondary check)
  else if (tip.includes('\u2022')) {
      return tip.split('\n').map(s => s.trim()).filter(Boolean);
  }
  // Otherwise, treat as a single block
  else {
      return [tip.trim()];
  }
}

// Hook to fetch and process professor data
export const useProfessors = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfessors = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/data/teaching_tips.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Expect an array of ProfessorData
        const data: ProfessorData[] = await response.json();
        
        // Map the raw data to the Professor type used by components
        const processedProfessors = data.map((profData) => {
          const professorId = profData.name.toLowerCase().replace(/\s+/g, '-').replace(/\.([^-]|$)/g, '$1');
          const portraitPath = getImagePath(profData.name);
          console.log(`[Debug] Mapping: ${profData.name}, Image: ${portraitPath}`); // Keep debug log

          const processedTips = processTip(profData.tip); // Process the tip string
          // *** ADD DETAILED LOGGING FOR TIPS ARRAY ***
          if (profData.name === 'Abe Ryuichi') {
            console.log(`[Debug] Processed Tips for ${profData.name}:`, JSON.stringify(processedTips, null, 2));
          }

          return {
            id: professorId,
            name: profData.name,
            title: profData.title,
            portrait: portraitPath,
            bio: profData.title, // Still using title as bio
            tips: processedTips, // Use the processed tips
          };
        });

        setProfessors(processedProfessors);

      } catch (err) {
        console.error("Error fetching or processing professor data:", err); // Log the actual error
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  return { professors, loading, error };
}; 