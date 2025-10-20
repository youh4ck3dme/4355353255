
'use client';

import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';


const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Meno musí mať aspoň 2 znaky.' }),
  phone: z.string().min(9, { message: 'Telefónne číslo musí mať aspoň 9 číslic.' }),
  email: z.string().email({ message: 'Zadajte platnú emailovú adresu.' }),
  address: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;


export const ContactForm = () => {
    const { toast } = useToast();
    const firestore = useFirestore();

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        if (!firestore) {
            toast({
                variant: "destructive",
                title: "Chyba pri inicializácii",
                description: "Databáza nie je dostupná. Skúste to prosím neskôr.",
            });
            return;
        }

        const submissionsCollection = collection(firestore, 'contact_submissions');
        
        try {
            await addDoc(submissionsCollection, {
                ...data,
                submittedAt: serverTimestamp(),
            });

            toast({
                variant: 'success',
                title: 'Požiadavka odoslaná!',
                description: 'Ďakujeme! Čoskoro sa vám ozveme.',
            });
            reset();

        } catch (serverError) {
             const permissionError = new FirestorePermissionError({
              path: submissionsCollection.path,
              operation: 'create',
              requestResourceData: data,
            });
            errorEmitter.emit('permission-error', permissionError);
            
            toast({
              variant: "destructive",
              title: "Chyba pri odosielaní",
              description: "Vyskytla sa chyba. Skúste to prosím znova.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Meno / Firma *</label>
                    <input
                        id="name"
                        {...register('name')}
                        className={cn("w-full p-3 border-2 rounded-lg focus:border-brand-bright-green focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors bg-white/5 backdrop-blur-sm placeholder-slate-400", errors.name ? "border-red-500 text-red-400" : "border-white/20 text-white")}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Mobil *</label>
                    <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className={cn("w-full p-3 border-2 rounded-lg focus:border-brand-bright-green focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors bg-white/5 backdrop-blur-sm placeholder-slate-400", errors.phone ? "border-red-500 text-red-400" : "border-white/20 text-white")}
                    />
                     {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email *</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={cn("w-full p-3 border-2 rounded-lg focus:border-brand-bright-green focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors bg-white/5 backdrop-blur-sm placeholder-slate-400", errors.email ? "border-red-500 text-red-400" : "border-white/20 text-white")}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-1">Adresa sťahovania</label>
                <input
                    type="text"
                    id="address"
                    {...register('address')}
                    placeholder='Odkiaľ a kam sa sťahujete?'
                    className="w-full p-3 border-2 border-white/20 rounded-lg focus:border-brand-bright-green focus:ring focus:ring-brand-bright-green/50 outline-none transition-colors bg-white/5 backdrop-blur-sm text-white placeholder-slate-400"
                />
            </div>
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-brand-bright-green text-brand-dark-teal font-bold rounded-lg hover:bg-opacity-80 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isSubmitting ? (
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
