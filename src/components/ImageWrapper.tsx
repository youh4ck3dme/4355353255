'use client';

import React, { useState, useRef, ReactElement } from 'react';
import { useImageReplacement } from '@/context/ImageReplacementContext';
import { Upload, X } from 'lucide-react';

interface ImageWrapperProps {
  children: ReactElement<any>;
}

export const ImageWrapper = ({ children }: ImageWrapperProps) => {
  const { isImageReplacementMode } = useImageReplacement();
  const [localSrc, setLocalSrc] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const originalSrc = children.props.src;
  const currentSrc = localSrc || originalSrc;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalSrc(e.target?.result as string);
        setIsModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = () => {
    if (urlInput.trim()) {
      setLocalSrc(urlInput.trim());
      setIsModalOpen(false);
      setUrlInput('');
    }
  };

  const clonedImage = React.cloneElement(children, {
    ...children.props,
    src: currentSrc,
  });

  if (!isImageReplacementMode) {
    return clonedImage;
  }

  return (
    <div className="relative group">
      {clonedImage}
      <div 
        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-white text-center">
          <Upload className="h-12 w-12 mx-auto" />
          <p className="font-bold">Vymeniť obrázok</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
          <div className="bg-brand-dark-teal p-8 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-brand-bright-green">Nahrať nový obrázok</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="h-6 w-6" />
                </button>
            </div>
            
            <div className="space-y-6">
                <div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full text-center px-4 py-3 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300"
                    >
                        Nahrať súbor z počítača
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                
                <div className="flex items-center">
                    <div className="flex-grow border-t border-slate-600"></div>
                    <span className="flex-shrink mx-4 text-slate-400">alebo</span>
                    <div className="flex-grow border-t border-slate-600"></div>
                </div>

                <div>
                    <input
                        type="text"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="Vložte URL adresu obrázka..."
                        className="w-full p-3 border-2 border-slate-600 rounded-lg focus:border-brand-bright-green 
                                   focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                                   bg-brand-dark-teal/80 text-white placeholder-slate-400"
                    />
                     <button
                        onClick={handleUrlChange}
                        className="w-full mt-3 text-center px-4 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-500 transition-colors duration-300"
                    >
                        Použiť URL
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
