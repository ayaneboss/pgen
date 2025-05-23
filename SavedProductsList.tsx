import React from 'react';
import { SavedProductItem } from '../types';
import { Button } from './Button';

interface SavedProductsListProps {
  savedProducts: SavedProductItem[];
  onViewProduct: (product: SavedProductItem) => void;
  onDeleteProduct: (productId: string) => void;
  onGenerateNew: () => void;
}

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.24.03 3.22.077m3.22-.077L10.879 3.286a1.125 1.125 0 0 1 1.07-1.528h1.054a1.125 1.125 0 0 1 1.07 1.527l-1.217 2.505M9 12h6M4.5 7.5h15" /></svg>;
const PlusCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;


export const SavedProductsList: React.FC<SavedProductsListProps> = ({
  savedProducts,
  onViewProduct,
  onDeleteProduct,
  onGenerateNew,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">My Saved Products</h2>
        <Button onClick={onGenerateNew} variant="primary" size="sm" icon={<PlusCircleIcon />}>
            Generate New
        </Button>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-10 bg-white border border-gray-200 rounded-lg shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h15.75c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 19.875v-6.75ZM3.75 13.5v6.375c0 .621.504 1.125 1.125 1.125h14.25c.621 0 1.125-.504 1.125-1.125V13.5M8.25 12h7.5M12 15V9.75M14.25 9.75H9.75M15.75 9.75C15.75 8.254 14.496 7 12.999 7h-.002C11.502 7 10.25 8.254 10.25 9.75M7.5 15h9" />
          </svg>
          <p className="text-gray-600 text-lg mb-2">No products saved yet.</p>
          <p className="text-gray-500 text-sm">Start by generating an idea and saving its structure!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {savedProducts.map((product) => (
            <li
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800 text-md">{product.productName}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Niche: {product.targetAudienceProfile.detailedPersona.substring(0,70)}... | Saved: {new Date(product.savedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                <Button onClick={() => onViewProduct(product)} variant="outline" size="sm" icon={<EyeIcon />}>
                  View
                </Button>
                <Button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${product.productName}"? This cannot be undone.`)) {
                      onDeleteProduct(product.id);
                    }
                  }}
                  variant="subtle"
                  size="sm"
                  icon={<TrashIcon />}
                  className="text-red-500 hover:bg-red-50"
                  aria-label={`Delete ${product.productName}`}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};