import React from 'react';
import { ModuleDetail } from '../types';
import { Button } from './Button';

interface ModuleCardProps {
  module: ModuleDetail;
  onViewScript: (script: string, title: string) => void;
}

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const ArrowDownTrayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const PencilSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);


export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onViewScript }) => {
  const handleDownloadAssets = () => {
    // Enhanced alert or a modal could be used here for better UX
    const assetsString = module.digitalToolsAndAssets.join('\n - ');
    alert(`Assets for "${module.moduleTitle}":\n\n${assetsString || 'No assets listed.'}\n\n(In a real app, this would trigger downloads or provide links.)`);
    console.log(`Download assets for module ${module.moduleNumber}:`, module.digitalToolsAndAssets);
  };

  const handleEdit = () => {
    alert(`Editing for "${module.moduleTitle}" is a conceptual feature. Full customization would be available in a production version.`);
    console.log(`Edit module ${module.moduleNumber}: ${module.moduleTitle}`);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <h4 className="text-lg font-semibold text-gray-800 mb-1">Module {module.moduleNumber}: {module.moduleTitle}</h4>
      <p className="text-sm text-gray-500 mb-3">Goal: {module.goal}</p>
      
      <div className="mb-3">
        <h5 className="text-sm font-medium text-gray-700 mb-1">💡 Breakthrough Moment:</h5>
        <p className="text-gray-600 text-sm">{module.breakthroughMoment}</p>
      </div>

      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-1">🛠️ Digital Tools & Assets:</h5>
        {module.digitalToolsAndAssets.length > 0 ? (
          <ul className="list-disc list-inside pl-1 text-gray-600 text-sm space-y-0.5">
            {module.digitalToolsAndAssets.map((asset, index) => (
              <li key={index}>{asset}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic">No specific digital tools listed for this module.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Button onClick={() => onViewScript(module.videoScript, `Module ${module.moduleNumber}: ${module.moduleTitle} - Video Script`)} variant="outline" size="sm" icon={<EyeIcon />}>
          View Script
        </Button>
        <Button onClick={handleDownloadAssets} variant="outline" size="sm" icon={<ArrowDownTrayIcon />}>
          Assets
        </Button>
        <Button onClick={handleEdit} variant="subtle" size="sm" icon={<PencilSquareIcon />}>
          Customize
        </Button>
      </div>
    </div>
  );
};