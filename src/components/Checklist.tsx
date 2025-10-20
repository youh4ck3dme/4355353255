
'use client';

import { useState, useEffect } from 'react';
import { ChecklistCategory } from '@/lib/checklist-data';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOCAL_STORAGE_KEY = 'vimo-checklist-state';

interface ChecklistProps {
  categories: ChecklistCategory[];
}

export const Checklist = ({ categories }: ChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        setCheckedItems(JSON.parse(savedState));
      }
    } catch (error) {
      console.error("Failed to load checklist state from localStorage", error);
    }
  }, []);

  const handleToggle = (itemId: string) => {
    const newCheckedItems = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newCheckedItems);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCheckedItems));
    } catch (error) {
       console.error("Failed to save checklist state to localStorage", error);
    }
  };

  const getCategoryProgress = (category: ChecklistCategory) => {
    const totalItems = category.items.length;
    if (totalItems === 0) return 0;
    const completedItems = category.items.filter(item => checkedItems[item.id]).length;
    return (completedItems / totalItems) * 100;
  };

  return (
    <div className="space-y-12">
      {categories.map(category => {
        const progress = getCategoryProgress(category);
        return (
          <div key={category.id} className="bg-brand-light-gray dark:bg-brand-dark-teal/80 p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-brand-dark-teal dark:text-brand-bg">{category.title}</h2>
             <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2.5 mb-6">
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
                    className="flex items-center cursor-pointer group"
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
