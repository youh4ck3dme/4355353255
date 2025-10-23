
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useUser, useFirestore } from '@/firebase/client-provider';
import { doc, setDoc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { ChecklistCategory } from '@/lib/checklist-data';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';

interface ChecklistProps {
  categories: ChecklistCategory[];
}

type CheckedItemsState = Record<string, boolean>;

export const Checklist = ({ categories }: ChecklistProps) => {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});
  const [isDataLoading, setIsDataLoading] = useState(true);

  const userChecklistRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, `checklists/${user.uid}`);
  }, [user, firestore]);

  // --- Debounced Firestore update for single item toggles ---
  const debouncedUpdateFirestore = useCallback(
    debounce(async (itemsToUpdate: CheckedItemsState) => {
      if (!userChecklistRef) return;
      try {
        await setDoc(userChecklistRef, { items: itemsToUpdate }, { merge: true });
      } catch (error) {
        console.error("Firestore update failed:", error);
        toast({
            variant: 'destructive',
            title: 'Chyba pri ukladaní',
            description: 'Nepodarilo sa uložiť váš postup. Skúste to prosím znova.',
        });
      }
    }, 1000),
    [userChecklistRef, toast]
  );

  // --- Load data from Firestore on user login ---
  useEffect(() => {
    const loadData = async () => {
      if (user && userChecklistRef) {
        setIsDataLoading(true);
        try {
          const docSnap = await getDoc(userChecklistRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setCheckedItems(data.items || {});
          }
        } catch (error) {
          console.error("Failed to load checklist state from Firestore", error);
        } finally {
          setIsDataLoading(false);
        }
      } else if (!isUserLoading) {
          setIsDataLoading(false);
      }
    };
    loadData();
  }, [user, isUserLoading, userChecklistRef]);

  const handleToggle = (itemId: string) => {
    const newCheckedItems = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newCheckedItems);
    debouncedUpdateFirestore(newCheckedItems);
  };
  
  const handleResetCategory = async (category: ChecklistCategory) => {
      if (!firestore || !userChecklistRef) return;

      const itemsToReset = category.items.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
      }, {} as CheckedItemsState);
      
      const newCheckedItems = { ...checkedItems, ...itemsToReset };
      setCheckedItems(newCheckedItems);

      try {
        const batch = writeBatch(firestore);
        const updateData: { [key: string]: boolean } = {};
        category.items.forEach(item => {
            updateData[`items.${item.id}`] = false;
        });
        
        batch.update(userChecklistRef, updateData);
        await batch.commit();

      } catch (error) {
         console.error("Firestore batch update failed:", error);
         toast({
            variant: 'destructive',
            title: 'Chyba pri resetovaní',
            description: 'Nepodarilo sa resetovať kategóriu. Skúste to prosím znova.',
        });
        setCheckedItems(checkedItems);
      }
  };

  const getCategoryProgress = (category: ChecklistCategory) => {
    const totalItems = category.items.length;
    if (totalItems === 0) return 0;
    const completedItems = category.items.filter(item => checkedItems[item.id]).length;
    return (completedItems / totalItems) * 100;
  };

  if (isUserLoading || isDataLoading) {
      return (
          <div className="text-center py-16 flex flex-col items-center justify-center min-h-[50vh]">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-brand-bright-green" />
              <p className="mt-4 text-slate-300">Načítavam váš osobný checklist...</p>
          </div>
      );
  }
  
  if (!user) {
      return (
           <div className="text-center py-16 bg-red-900/20 border border-red-500/50 rounded-lg">
                <h3 className="text-2xl font-bold text-red-300">Personalizovaný Checklist</h3>
                <p className="mt-2 text-slate-400">Pre ukladanie vášho postupu je potrebná anonymná relácia. Ak sa nenačítava, obnovte stránku.</p>
           </div>
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
