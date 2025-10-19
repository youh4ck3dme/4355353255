'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ImageReplacementContextType {
  isImageReplacementMode: boolean;
  setIsImageReplacementMode: (isEditing: boolean) => void;
}

const ImageReplacementContext = createContext<ImageReplacementContextType | undefined>(undefined);

export const ImageReplacementProvider = ({ children }: { children: ReactNode }) => {
  const [isImageReplacementMode, setIsImageReplacementMode] = useState(false);

  return (
    <ImageReplacementContext.Provider value={{ isImageReplacementMode, setIsImageReplacementMode }}>
      {children}
    </ImageReplacementContext.Provider>
  );
};

export const useImageReplacement = () => {
  const context = useContext(ImageReplacementContext);
  if (context === undefined) {
    throw new Error('useImageReplacement must be used within an ImageReplacementProvider');
  }
  return context;
};
