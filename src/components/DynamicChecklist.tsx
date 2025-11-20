
'use client';

import dynamic from 'next/dynamic';
import { ChecklistCategory } from '@/lib/checklist-data';

const Checklist = dynamic(() => import('@/components/Checklist').then(mod => mod.Checklist), { ssr: false });

export default function DynamicChecklist({ categories }: { categories: ChecklistCategory[] }) {
    return <Checklist categories={categories} />;
}
