
import React, { useState, useCallback, useEffect } from 'react';
import { ProductIdea, FullProduct, AppPhase, SavedProductItem } from './types';
import { generateProductIdea, buildFullProduct } from './services/geminiService';
import { Button } from './components/Button';
import { IdeaCard } from './components/IdeaCard';
import { ProductDetailsView } from './components/ProductDetailsView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { SavedProductsList } from './components/SavedProductsList'; // New component

const LOCAL_STORAGE_KEY = 'digitalProductGenerator_savedProducts';

const App: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<AppPhase>(AppPhase.Initial);
  const [currentIdea, setCurrentIdea] = useState<ProductIdea | null>(null);
  const [generatedProduct, setGeneratedProduct] = useState<FullProduct | SavedProductItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isGeneratingNextIdea, setIsGeneratingNextIdea] = useState<boolean>(false);
  const [isApprovingIdea, setIsApprovingIdea] = useState<boolean>(false);
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false);
  const [scriptModalContent, setScriptModalContent] = useState<{ title: string; script: string } | null>(null);
  // No longer need apiKeyMissingError state as API key is handled server-side

  const [savedProducts, setSavedProducts] = useState<SavedProductItem[]>([]);

  useEffect(() => {
    // Load saved products from localStorage on initial mount
    try {
      const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedProducts) {
        setSavedProducts(JSON.parse(storedProducts));
      }
    } catch (e) {
      console.error("Failed to load saved products from localStorage:", e);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedProducts));
    } catch (e) {
      console.error("Failed to save products to localStorage:", e);
       setError("Could not save product. Your browser's storage might be full or disabled.");
    }
  }, [savedProducts]);


  const handleGenerateIdea = useCallback(async (isRetry: boolean = false) => {
    setError(null);
    if (!isRetry) setGeneratedProduct(null);
    
    setIsLoading(true);
    if (currentPhase !== AppPhase.IdeaGeneration || isRetry) {
        setIsGeneratingNextIdea(true);
    }

    try {
      const idea = await generateProductIdea(); // API key no longer passed
      if (idea) {
        setCurrentIdea(idea);
        setCurrentPhase(AppPhase.IdeaGeneration);
      } else {
        setError("Failed to generate a valid idea. The AI returned an unexpected format. Please try again.");
      }
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("An unknown error occurred during idea generation. Please try again.");
      setCurrentIdea(null);
    } finally {
      setIsLoading(false);
      setIsGeneratingNextIdea(false);
    }
  }, [currentPhase]);

  const handleApproveIdea = useCallback(async () => {
    if (!currentIdea) {
      setError("No idea to approve.");
      return;
    }
    setError(null);
    setIsApprovingIdea(true);
    setIsLoading(true);
    setCurrentPhase(AppPhase.ProductBuilding);
    try {
      const product = await buildFullProduct(currentIdea); // API key no longer passed
      if (product) {
        setGeneratedProduct(product);
        setCurrentPhase(AppPhase.ProductView);
      } else {
        setError("Failed to generate the full product. The AI returned an unexpected format or incomplete data. Please try approving the idea again or generate a new one.");
        setCurrentPhase(AppPhase.IdeaGeneration);
      }
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError("An unknown error occurred while building the product. Please try again.");
      setCurrentPhase(AppPhase.IdeaGeneration);
    } finally {
      setIsLoading(false);
      setIsApprovingIdea(false);
    }
  }, [currentIdea]);

  const handleViewScript = (script: string, title: string) => {
    setScriptModalContent({ script, title });
    setShowScriptModal(true);
  };
  
  const handleStartOver = () => {
    setCurrentIdea(null);
    setGeneratedProduct(null);
    setError(null);
    setCurrentPhase(AppPhase.Initial);
  };

  const handleNavigateHome = () => {
    if (currentPhase !== AppPhase.IdeaGeneration && currentPhase !== AppPhase.ProductView) {
      setCurrentPhase(AppPhase.Initial);
    }
  };

  const handleNavigateToSavedProducts = () => {
    setCurrentPhase(AppPhase.SavedProductsView);
  };

  const handleSaveCurrentProduct = () => {
    if (generatedProduct && !('id' in generatedProduct && savedProducts.some(p => p.id === (generatedProduct as SavedProductItem).id))) {
      const newSavedProduct: SavedProductItem = {
        ...generatedProduct,
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        savedAt: new Date().toISOString(),
      };
      setSavedProducts(prev => [newSavedProduct, ...prev]);
      setGeneratedProduct(newSavedProduct);
    }
  };

  const handleDeleteSavedProduct = (productId: string) => {
    setSavedProducts(prev => prev.filter(p => p.id !== productId));
    if (generatedProduct && 'id' in generatedProduct && (generatedProduct as SavedProductItem).id === productId) {
      const { id, savedAt, ...restOfProduct } = generatedProduct as SavedProductItem;
      setGeneratedProduct(restOfProduct as FullProduct);
    }
  };

  const handleViewSavedProduct = (product: SavedProductItem) => {
    setGeneratedProduct(product);
    setCurrentIdea(null);
    setCurrentPhase(AppPhase.ProductView);
  };


  const renderContent = () => {
    // Removed API Key missing error from UI as it's handled server-side
    if (isLoading && (currentPhase === AppPhase.Initial || currentPhase === AppPhase.ProductBuilding || isGeneratingNextIdea)) {
        let message = "Generating your unique product idea...";
        if (currentPhase === AppPhase.ProductBuilding) {
            message = "Building your complete Digital Product 2.0...";
        }
         return <LoadingSpinner message={message} />;
    }
    
    if (error) {
      return (
        <div className="text-center p-6 bg-red-50 border border-red-300 rounded-md max-w-xl mx-auto my-8 shadow-sm">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Oops! Something went wrong.</h2>
          <p className="text-red-600 mb-4 whitespace-pre-wrap text-sm">{error}</p>
          <Button onClick={() => {
            setError(null);
            if (currentPhase === AppPhase.IdeaGeneration || currentPhase === AppPhase.ProductBuilding || currentPhase === AppPhase.ProductView) {
              // If error occurred during a process, try to regenerate idea if on idea page,
              // or allow user to navigate if on product view
              if(currentIdea && currentPhase !== AppPhase.ProductView) {
                 handleApproveIdea(); // If there was an idea, try building again
              } else {
                 handleGenerateIdea(true); // Default to trying idea generation again
              }
            } else {
              handleStartOver(); // For initial state errors or unrecoverable states
            }
          }} variant="danger" size="sm">
            Try Again
          </Button>
        </div>
      );
    }

    switch (currentPhase) {
      case AppPhase.Initial:
        return (
          <div className="text-center py-12 sm:py-20 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">AI-Powered Product Creation</h2>
            <p className="text-gray-600 mb-8 text-lg">Instantly generate and structure unique digital product ideas. Ready to innovate?</p>
            <Button onClick={() => handleGenerateIdea(false)} size="lg" variant="primary" isLoading={isLoading}>
              ✨ Generate First Product Idea
            </Button>
          </div>
        );
      case AppPhase.IdeaGeneration:
        if (currentIdea) {
          return (
            <IdeaCard 
              idea={currentIdea} 
              onApprove={handleApproveIdea} 
              onNextIdea={() => handleGenerateIdea(false)}
              isGeneratingNext={isGeneratingNextIdea}
              isApproving={isApprovingIdea}
            />
          );
        }
        // If no currentIdea and not loading, it implies an error should have been set
        // or we should be in initial phase. handleGenerateIdea is called on initial button press.
        // If it's here without an idea and not loading, it might be after an error was cleared.
        // Redirecting to initial or showing specific message might be good.
        // For now, showing spinner or a soft error/prompt.
        if (!isLoading) {
            handleStartOver(); // Or set an error to guide user
            return <LoadingSpinner message="Preparing..."/>;
        }
        return <LoadingSpinner message="Fetching new idea..."/>; 
      case AppPhase.ProductBuilding:
        return <LoadingSpinner message="Building your complete Digital Product 2.0... This can take a moment." />;
      case AppPhase.ProductView:
        if (generatedProduct) {
          const isSaved = 'id' in generatedProduct && savedProducts.some(p => p.id === (generatedProduct as SavedProductItem).id);
          return <ProductDetailsView 
                    product={generatedProduct} 
                    onViewScript={handleViewScript} 
                    onStartOver={handleStartOver}
                    onSaveProduct={handleSaveCurrentProduct}
                    isProductSaved={isSaved} 
                  />;
        }
        setError("Product data is missing. Please try generating again.");
        setCurrentPhase(AppPhase.Initial); 
        return null;
      case AppPhase.SavedProductsView:
        return <SavedProductsList
                  savedProducts={savedProducts}
                  onViewProduct={handleViewSavedProduct}
                  onDeleteProduct={handleDeleteSavedProduct}
                  onGenerateNew={handleStartOver}
                />;
      default:
        return <p className="text-center text-gray-500 mt-10">Welcome! Click the button to start.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onNavigateToSavedProducts={handleNavigateToSavedProducts} onNavigateHome={handleNavigateHome} />
      <main className="container mx-auto p-4 sm:p-6 flex-grow w-full">
        {renderContent()}
      </main>
      <Modal
        isOpen={showScriptModal}
        onClose={() => setShowScriptModal(false)}
        title={scriptModalContent?.title || "Video Script"}
      >
        <div className="prose prose-sm sm:prose-base max-w-none whitespace-pre-wrap text-gray-700">
          {scriptModalContent?.script}
        </div>
      </Modal>
      <footer className="text-center py-5 border-t border-gray-200 bg-white">
        <p className="text-xs text-gray-500">Powered by Gemini AI & React. Designed for Innovation.</p>
      </footer>
    </div>
  );
};

export default App;
