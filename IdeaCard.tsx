import React from 'react';
import { ProductIdea } from '../types';
import { Button } from './Button';

interface IdeaCardProps {
  idea: ProductIdea;
  onApprove: () => void;
  onNextIdea: () => void;
  isGeneratingNext: boolean;
  isApproving: boolean;
}

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.055 15.055 0 0 1-4.5 0m4.5 0v-.375c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v.375m4.5 0v.375a1.125 1.125 0 0 1-1.125 1.125h-1.5a1.125 1.125 0 0 1-1.125-1.125v-.375m4.5 0h.008v.015h-.008v-.015Zm1.5-1.5h-.008v.015h.008v-.015Zm-4.5 2.25h.008v.015h-.008V18Zm-1.5-2.25h-.008v.015h.008v-.015ZM9.75 15.75c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v.375M9.75 15.75v.375m0 0a1.125 1.125 0 0 0 1.125 1.125h1.5a1.125 1.125 0 0 0 1.125-1.125m-3.75 0h.008v.015h-.008v-.015Zm1.5 3.75c.621 0 1.125-.504 1.125-1.125V18c0-.621-.504-1.125-1.125-1.125h-1.5c-.621 0-1.125.504-1.125 1.125v.375c0 .621.504 1.125 1.125 1.125h1.5Zm0 0h.008v.015h-.008V19.5Zm-1.5-3h.008v.015h-.008V16.5Zm-3 3h.008v.015h-.008V19.5Zm0-3h.008v.015h-.008V16.5Zm3-3h.008v.015h-.008V13.5Zm0-3h.008v.015h-.008V10.5Zm-3 3h.008v.015h-.008V13.5Zm0 3h.008v.015h-.008V16.5Zm-3-3h.008v.015h-.008V13.5Zm0-3h.008v.015h-.008V10.5Z" />
  </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const ArrowPathIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
);


export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onApprove, onNextIdea, isGeneratingNext, isApproving }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-2xl mx-auto my-8 border border-gray-200">
      <div className="flex items-start mb-6">
        <div className="p-2 bg-blue-100 rounded-md mr-4 mt-1">
          <LightbulbIcon />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-tight">{idea.productIdeaName}</h2>
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">🎯 Niche</h3>
          <p className="text-gray-700 text-base">{idea.niche}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">🧠 Core Problem</h3>
          <p className="text-gray-700 text-base">{idea.coreProblem}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">✨ Transformation / Outcome</h3>
          <p className="text-gray-700 text-base">{idea.transformationOutcome}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">💰 Willingness to Buy</h3>
          <p className="text-gray-700 text-base">{idea.willingnessToBuy}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onApprove} 
          variant="primary" 
          size="md" 
          className="flex-1" 
          icon={<CheckCircleIcon />}
          isLoading={isApproving}
          disabled={isGeneratingNext}
        >
          Approve & Build Product
        </Button>
        <Button 
          onClick={onNextIdea} 
          variant="outline" 
          size="md" 
          isLoading={isGeneratingNext} 
          className="flex-1" 
          icon={<ArrowPathIcon />}
          disabled={isApproving}
        >
          Next Idea
        </Button>
      </div>
    </div>
  );
};