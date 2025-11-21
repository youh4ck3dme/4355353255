'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { doc, setDoc, onSnapshot, DocumentReference } from 'firebase/firestore';
import { ChecklistCategory } from '@/lib/checklist-data';
import { Check, Circle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import { useFirebase } from '@/firebase/provider';
import GlassCard from './GlassCard';


interface ChecklistProps {
  categories: ChecklistCategory[];
}

type CheckedItemsState = Record<string, boolean>;

function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  
  return debounced as (...args: Parameters<F>) => void;
}


export const Checklist = ({ categories }: ChecklistProps) => {
  const { toast } = useToast();
  const { firestore, user, isLoading: isFirebaseLoading } = useFirebase();
  
  const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});
  const [isDataLoading, setIsDataLoading] = useState(true);

  const userChecklistRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, `checklists/${user.uid}`);
  }, [user, firestore]);

  // Data listener
  useEffect(() => {
    if (!userChecklistRef) {
        if(!isFirebaseLoading) setIsDataLoading(false);
        return;
    }

    const unsubscribe = onSnapshot(userChecklistRef, 
      (docSnap) => {
        if (docSnap.exists()) {
          setCheckedItems(docSnap.data().items || {});
        }
        setIsDataLoading(false);
      },
      (error) => {
        console.error("Failed to load checklist state from Firestore", error);
        toast({
            variant: 'destructive',
            title: 'Chyba pri načítaní',
            description: 'Nepodarilo sa načítať váš uložený postup.',
        });
        setIsDataLoading(false);
      }
    );
    
    return () => unsubscribe();
  }, [userChecklistRef, toast, isFirebaseLoading]);


  const debouncedUpdateFirestore = useCallback(
    debounce(async (ref: DocumentReference, items: CheckedItemsState) => {
      try {
        await setDoc(ref, { items }, { merge: true });
      } catch (error) {
        console.error("Firestore update failed:", error);
        toast({
            variant: 'destructive',
            title: 'Chyba pri ukladaní',
            description: 'Nepodarilo sa uložiť váš postup. Skúste to prosím znova.',
        });
      }
    }, 1000),
    [toast]
  );

  const handleToggle = (itemId: string) => {
    if (!userChecklistRef) return;
    const newCheckedItems = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newCheckedItems);
    debouncedUpdateFirestore(userChecklistRef, newCheckedItems);
  };

  const handleResetCategory = (category: ChecklistCategory) => {
      if (!userChecklistRef) return;

      const itemsToReset = category.items.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
      }, {} as CheckedItemsState);

      const newCheckedItems = { ...checkedItems, ...itemsToReset };
      setCheckedItems(newCheckedItems);
      
      // Directly update firestore without debounce for instant reset
      setDoc(userChecklistRef, { items: newCheckedItems }, { merge: true }).catch(error => {
         console.error("Firestore reset failed:", error);
         toast({
            variant: 'destructive',
            title: 'Chyba pri resetovaní',
            description: 'Nepodarilo sa resetovať kategóriu. Skúste to prosím znova.',
        });
      });
  };

  const getCategoryProgress = (category: ChecklistCategory) => {
    const totalItems = category.items.length;
    if (totalItems === 0) return 0;
    const completedItems = category.items.filter(item => checkedItems[item.id]).length;
    return (completedItems / totalItems) * 100;
  };

  if (isFirebaseLoading || isDataLoading) {
      return (
          <div className="text-center py-16 flex flex-col items-center justify-center min-h-[50vh]">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-bright-green" />
              <p className="mt-4 text-slate-300">Načítavam váš osobný checklist...</p>
          </div>
      );
  }

  if (!user) {
    return (
       <GlassCard>
        <div className="text-center py-16 flex flex-col items-center justify-center min-h-[40vh] p-8">
            <h2 className="text-2xl font-bold text-brand-bright-green mb-4">Prihláste sa pre ukladanie postupu</h2>
            <p className="text-slate-300">Pre ukladanie vášho postupu v checklise je potrebné byť prihlásený. Prihlasovanie je anonymné a bezpečné.</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-12">
      {categories.map(category => {
        const progress = getCategoryProgress(category);
        return (
          <div key={category.id} className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 md:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/20 border border-transparent">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-brand-dark-teal dark:text-brand-bg">{category.title}</h2>
                <button
                  onClick={() => handleResetCategory(category)}
                  className="text-xs text-slate-400 hover:text-red-400 hover:underline"
                  aria-label={`Resetovať kategóriu ${category.title}`}
                >
                  Resetovať
                </button>
            </div>
             <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2.5 mb-6 overflow-hidden">
                <div
                    className="bg-brand-bright-green h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <ul className="space-y-4">
              {category.items.map(item => (
                <li key={item.id}>
                  <label
                    htmlFor={item.id}
                    className="flex items-center cursor-pointer group p-2 rounded-md hover:bg-black/10"
                  >
                    <input
                      id={item.id}
                      type="checkbox"
                      className="sr-only"
                      checked={!!checkedItems[item.id]}
                      onChange={() => handleToggle(item.id)}
                      disabled={!user || !firestore}
                    />
                    <div className="flex-shrink-0 w-6 h-6 mr-4 flex items-center justify-center rounded-full border-2 border-brand-secondary-grey dark:border-slate-500 group-hover:border-brand-bright-green transition-colors">
                      {checkedItems[item.id] ? (
                        <Check className="w-5 h-5 text-brand-bright-green" />
                      ) : (
                        <Circle className="w-2 h-2 text-transparent" />
                      )}
                    </div>
                    <span className={cn(
                      "text-lg text-brand-text dark:text-brand-bg transition-colors",
                      checkedItems[item.id] && "line-through text-brand-secondary-grey dark:text-slate-400"
                    )}>
                      {item.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
