import React from 'react';
import { FullProduct, PricingTier, ModuleDetail, AdIdea, SavedProductItem } from '../types';
import { ModuleCard } from './ModuleCard';
import { Button } from './Button';

interface ProductDetailsViewProps {
  product: FullProduct | SavedProductItem;
  onViewScript: (script: string, title: string) => void;
  onStartOver: () => void;
  onSaveProduct: () => void;
  isProductSaved: boolean;
}

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: React.ReactNode; className?: string }> = ({ title, children, icon, className = '' }) => (
  <div className={`mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    <div className="flex items-center mb-4">
      {icon && <span className="mr-2 text-gray-500">{icon}</span>}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

// Using smaller, monochrome Heroicons for a Notion-like feel
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>;
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688 0-1.35-.28-1.836-.772l-3.486-3.486A2.625 2.625 0 0 1 4.25 9.375V8.25A2.625 2.625 0 0 1 6.875 5.625h1.312c.688 0 1.35.28 1.836.772l3.486 3.486A2.625 2.625 0 0 1 14.25 12.125v1.312A2.625 2.625 0 0 1 11.625 16h-1.285Zm3.358-2.552a.75.75 0 0 0 0-1.06l-2.22-2.22a.75.75 0 0 0-1.06 0l-2.22 2.22a.75.75 0 0 0 1.06 1.06l1.69-1.69v4.69a.75.75 0 0 0 1.5 0v-4.69l1.69 1.69a.75.75 0 0 0 1.06 0Z" /></svg>;
const PuzzlePieceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355-.186-.676-.401-.959.215-.283.401-.604.401-.959 0-.552-.448-1-1-1s-1 .448-1 1c0 .355.186.676.401.959A1.904 1.904 0 0 1 12.25 6c-.355 0-.676-.186-.959-.401.283-.215.604-.401.959-.401.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1c0 .355.186.676.401.959.215.283.401.604.401.959a1.904 1.904 0 0 1-.401.959c-.215-.283-.401-.604-.401-.959Zm-1.5 0c0-.552-.448-1-1-1s-1 .448-1 1c0 .355.186.676.401.959.215.283.401.604.401.959a1.904 1.904 0 0 1-.401.959c-.215-.283-.401-.604-.401-.959Zm-3 3.75c0 .355.186.676.401.959a1.904 1.904 0 0 1-.401.959c-.215-.283-.401-.604-.401-.959 0-.552.448-1 1-1s1 .448 1 1Zm1.5 0c0 .552.448 1 1 1s1-.448 1-1c0-.355-.186-.676-.401-.959a1.904 1.904 0 0 0 .401-.959c.215.283.401.604.401.959 0 .552-.448 1-1 1ZM6 21a2.25 2.25 0 0 1-2.25-2.25V15m3.75-3.75c.355 0 .676.186.959.401a1.904 1.904 0 0 1 .959-.401c.215.283.401.604.401.959 0 .552-.448 1-1 1s-1-.448-1-1c0-.355.186.676.401-.959Zm0 1.5c-.355 0-.676-.186-.959-.401a1.904 1.904 0 0 0-.959.401c-.215-.283-.401-.604-.401-.959 0-.552.448-1 1-1s1 .448 1 1Zm0 0v1.125c0 .621-.504 1.125-1.125 1.125H6.75A1.125 1.125 0 0 1 5.625 18v-1.125m0 0h1.125A1.125 1.125 0 0 0 7.875 18v1.125m0 0c0 .621.504 1.125 1.125 1.125h.375m-1.5 0H6a2.25 2.25 0 0 0-2.25 2.25V21M21 15.75V18a2.25 2.25 0 0 1-2.25 2.25h-2.25m1.5-1.5v-1.125c0-.621.504-1.125 1.125-1.125h.375m0 0H21m-1.5 0h-1.125A1.125 1.125 0 0 1 16.125 18v1.125m0 0c0 .621-.504 1.125-1.125 1.125h-1.5m1.5 0v-1.5M12 3.75A2.25 2.25 0 0 1 14.25 6v1.5H9.75V6A2.25 2.25 0 0 1 12 3.75Z" /></svg>;
const TagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" /></svg>;
const PaletteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.375 3.375 0 0 1 3.375 17.625c0-1.03.394-1.983 1.098-2.724M10.5 19.5A3.375 3.375 0 0 0 13.875 16.125c1.03 0 1.983-.394 2.724-1.098M10.5 19.5c.352.418.769.764 1.228 1.034a3.75 3.75 0 0 0 5.304 0l6.401-6.402M10.5 19.5c-3.528 0-6.75-2.828-6.75-6.375s2.828-6.375 6.375-6.375m11.25 0c0 3.528-2.828 6.375-6.375 6.375s-6.375-2.828-6.375-6.375m11.25 0c0-3.528-2.828-6.375-6.375-6.375M3 13.5c0-3.528 2.828-6.375 6.375-6.375m6.375 12.75c0 3.528 2.828 6.375 6.375 6.375M3.053 16.947A3.75 3.75 0 0 1 3 16.125v-.938c0-.138.01-.275.03-.41M20.969 8.053A3.75 3.75 0 0 0 21 7.875v.938c0 .138-.01.275-.03.41M20.969 15.947A3.75 3.75 0 0 1 21 16.125v-.938c0-.138-.01.275-.03-.41M3.053 7.053A3.75 3.75 0 0 0 3 7.875v.938c0 .138.01.275.03.41M12 21a9.753 9.753 0 0 1-4.132-1.148m8.264 0A9.753 9.753 0 0 0 12 21m0-18a9.753 9.753 0 0 1 4.132 1.148M7.868 3.852A9.753 9.753 0 0 0 12 3m0 18a9.75 9.75 0 0 0 5.303-1.674M6.697 4.83A9.75 9.75 0 0 0 3 8.25m13.5 8.25c.39-.54.698-1.14.905-1.774M12 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /></svg>;
const GiftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A3.375 3.375 0 0 0 8.625 1.5H7.5c-.71 0-1.39.121-2.05.352M12 4.875c1.657 0 3.183-.853 4.05-2.175a3.507 3.507 0 0 1 2.05-.352H16.5a3.375 3.375 0 0 0-3.375 3.375M12 4.875v6.375m0 0H4.5m7.5 0H20.25M12 11.25a2.25 2.25 0 0 0-2.25 2.25v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125v-3.375a2.25 2.25 0 0 0-2.25-2.25Z" /></svg>;
const ArrowUturnLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>;
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>;
const CheckBadgeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>;


export const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ product, onViewScript, onStartOver, onSaveProduct, isProductSaved }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="text-left mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
          {product.productName}
        </h1>
        <p className="text-lg text-gray-600">{product.coreValueProposition}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button 
            onClick={onSaveProduct} 
            variant={isProductSaved ? "secondary" : "primary"}
            size="md"
            icon={isProductSaved ? <CheckBadgeIcon /> : <BookmarkIcon />}
            disabled={isProductSaved}
          >
            {isProductSaved ? "Product Saved" : "Save Product"}
          </Button>
          <Button onClick={onStartOver} variant="outline" size="md" icon={<ArrowUturnLeftIcon />}>
            Generate New Idea
          </Button>
        </div>
      </div>

      <Section title="Target Audience Profile" icon={<UsersIcon />}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Detailed Persona:</h4>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">{product.targetAudienceProfile.detailedPersona}</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-1">Goals:</h4>
                <ul className="list-disc list-inside pl-4 text-gray-600 text-sm space-y-0.5">
                    {product.targetAudienceProfile.goals.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-1">Pains:</h4>
                <ul className="list-disc list-inside pl-4 text-gray-600 text-sm space-y-0.5">
                    {product.targetAudienceProfile.pains.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-1">Behaviors:</h4>
                <ul className="list-disc list-inside pl-4 text-gray-600 text-sm space-y-0.5">
                    {product.targetAudienceProfile.behaviors.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Transformation Promise" icon={<PuzzlePieceIcon />}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Before:</h4>
            <p className="text-gray-600 text-sm">{product.transformationPromise.before}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">After:</h4>
            <p className="text-gray-600 text-sm">{product.transformationPromise.after}</p>
          </div>
        </div>
      </Section>

      <Section title="Program Structure" icon={<PuzzlePieceIcon /* Consider a list/structure icon */ />}>
        <div className="space-y-4">
          {product.programStructure.map((module: ModuleDetail) => (
            <ModuleCard key={module.moduleNumber} module={module} onViewScript={onViewScript} />
          ))}
        </div>
      </Section>

      <Section title="Pricing Strategy" icon={<TagIcon />}>
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">Psychological Triggers:</h4>
          <ul className="list-disc list-inside pl-4 text-gray-600 text-sm">
            {product.pricingStrategy.psychologicalTriggers.map((trigger, i) => <li key={i}>{trigger}</li>)}
          </ul>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {product.pricingStrategy.tiers.map((tier: PricingTier) => (
            <div key={tier.name} className="p-5 rounded-md border border-gray-200 bg-gray-50 hover:shadow-sm transition-shadow">
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{tier.name} - <span className="text-blue-600">{tier.price}</span></h4>
              <p className="text-sm text-gray-500 mb-3">{tier.description}</p>
              <ul className="list-disc list-inside pl-4 text-gray-600 text-sm space-y-0.5">
                {tier.features.map((feature, i) => <li key={i}>{feature}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Marketing Angles" icon={<MegaphoneIcon />}>
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">Emotional Hooks:</h4>
          <ul className="list-disc list-inside pl-4 text-gray-600 text-sm">
            {product.marketingAngles.emotionalHooks.map((hook, i) => <li key={i}>{hook}</li>)}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-1">Ad Ideas:</h4>
          {product.marketingAngles.adIdeas.map((ad: AdIdea, i: number) => (
            <div key={i} className="bg-gray-50 p-3 rounded-md my-2 border border-gray-200 text-sm">
              <p className="font-semibold text-gray-700">{ad.platform}</p>
              {ad.headline && <p className="text-gray-600"><strong>Headline:</strong> {ad.headline}</p>}
              {ad.copy && <p className="text-gray-600"><strong>Copy:</strong> {ad.copy}</p>}
              {ad.description && <p className="text-gray-600"><strong>Description:</strong> {ad.description}</p>}
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Sales Page Headlines:</h4>
          <ul className="list-disc list-inside pl-4 text-gray-600 text-sm">
            {product.marketingAngles.salesPageHeadlines.map((headline, i) => <li key={i}>{headline}</li>)}
          </ul>
        </div>
      </Section>
      
      <Section title="Lead Magnet Suggestion" icon={<GiftIcon />}>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-1">{product.leadMagnetSuggestion.title} ({product.leadMagnetSuggestion.format})</h4>
            <p className="text-gray-600 text-sm">{product.leadMagnetSuggestion.description}</p>
        </div>
      </Section>

      <Section title="Visual Identity Guidance" icon={<PaletteIcon />}>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
                <h4 className="font-medium text-gray-700 mb-2">Color Scheme:</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                    {(Object.entries(product.visualIdentityGuidance.colorScheme) as [string, string][]).map(([name, color]) => (
                        <div key={name} className="flex items-center">
                            <span className="inline-block w-3 h-3 rounded-sm mr-1.5 border border-gray-300" style={{ backgroundColor: color.match(/#([0-9a-fA-F]{3,6})\b/)?.[0] || color }}></span>
                            <span className="capitalize text-gray-600">{name.replace(/([A-Z])/g, ' $1').trim()}: </span> <span className="ml-1 text-gray-500">{color}</span>
                        </div>
                    ))}
                </div>
            </div>
             <div>
                <h4 className="font-medium text-gray-700 mb-2">Fonts:</h4>
                <p className="text-gray-600"><strong>Headings:</strong> {product.visualIdentityGuidance.fonts.headings}</p>
                <p className="text-gray-600"><strong>Body:</strong> {product.visualIdentityGuidance.fonts.body}</p>
            </div>
        </div>
        <div>
            <h4 className="font-medium text-gray-700 mt-4 mb-2">Branding Notes:</h4>
            <ul className="list-disc list-inside pl-4 text-gray-600 text-sm">
                {product.visualIdentityGuidance.brandingNotes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
        </div>
      </Section>
    </div>
  );
};