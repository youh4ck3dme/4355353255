
'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Meno musí mať aspoň 2 znaky.' }),
  phone: z.string().min(9, { message: 'Telefónne číslo musí mať aspoň 9 číslic.' }),
  email: z.string().email({ message: 'Zadajte platnú emailovú adresu.' }),
  address: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type FormErrors = z.inferFlattenedErrors<typeof contactFormSchema>;


export const ContactForm = () => {
    const [values, setValues] = useState<ContactFormValues>({
        name: '',
        phone: '',
        email: '',
        address: '',
    });
    const [errors, setErrors] = useState<FormErrors['fieldErrors'] | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
    const { toast } = useToast();
    const firestore = useFirestore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrors(null);

        const validationResult = contactFormSchema.safeParse(values);

        if (!validationResult.success) {
            const zodErrors = validationResult.error.flatten();
            setErrors(zodErrors.fieldErrors);
            setStatus('idle');
            return;
        }

        if (!firestore) {
            toast({
                variant: "destructive",
                title: "Chyba pri inicializácii",
                description: "Databáza nie je dostupná. Skúste to prosím neskôr.",
            });
            setStatus('idle');
            return;
        }

        try {
            const submissionsCollection = collection(firestore, 'contact_submissions');
            
            // Non-blocking write
            addDoc(submissionsCollection, {
                ...validationResult.data,
                submittedAt: serverTimestamp(),
            }).catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                  path: submissionsCollection.path,
                  operation: 'create',
                  requestResourceData: validationResult.data,
                });
                errorEmitter.emit('permission-error', permissionError);
                
                // Also show a toast to the user
                toast({
                  variant: "destructive",
                  title: "Chyba pri odosielaní",
                  description: "Vyskytla sa chyba. Skúste to prosím znova.",
                });
            });


            toast({
                variant: 'success',
                title: 'Požiadavka odoslaná!',
                description: 'Ďakujeme! Čoskoro sa vám ozveme.',
            });
            
            // Reset form optimistically
            setValues({ name: '', phone: '', email: '', address: '' });

        } catch (error) {
            console.error("Error adding document: ", error);
             toast({
                variant: "destructive",
                title: "Vyskytla sa neočakávaná chyba",
                description: "Prosím, skúste to znova neskôr alebo nás kontaktujte priamo.",
            });
        } finally {
            setStatus('idle');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Meno / Firma *</label>
                    <input
                        type="text"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                                   focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                                   bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                    />
                    {errors?.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Mobil *</label>
                    <input
                        type="tel"
                        id="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                                   focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                                   bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                    />
                     {errors?.phone && <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Email *</label>
                <input
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                               focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                               bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                />
                {errors?.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-brand-secondary-grey dark:text-slate-300 mb-1">Adresa sťahovania</label>
                <input
                    type="text"
                    id="address"
                    value={values.address || ''}
                    onChange={handleChange}
                    placeholder='Odkiaľ a kam sa sťahujete?'
                    className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-bright-green 
                               focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors 
                               bg-brand-bg dark:bg-brand-dark-teal dark:text-brand-bg placeholder-brand-secondary-grey"
                />
            </div>
            <div>
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="liquid-glass-button w-full px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {status === 'submitting' ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Odosielam...
                        </>
                    ) : (
                        'Odoslať požiadavku'
                    )}
                </button>
            </div>
        </form>
    );
};
