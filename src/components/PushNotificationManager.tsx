'use client';

import { useEffect } from 'react';
import { getMessagingToken, onMessageListener } from '@/lib/firebase-messaging';
import { useToast } from './ui/use-toast';
import { useFirebase } from '@/firebase/provider';

const PushNotificationManager = () => {
    const { toast } = useToast();
    const { user, isLoading } = useFirebase();

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const registerServiceWorker = async () => {
                try {
                    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
                    console.log('Service Worker registration successful, scope is:', registration.scope);
                    
                    // Now that SW is active, get the token if user is loaded and logged in
                    if (!isLoading) {
                        getMessagingToken();
                    }

                } catch (err) {
                    console.error('Service Worker registration failed, error:', err);
                }
            };
            
            registerServiceWorker();
        }
    }, [isLoading]);

    useEffect(() => {
        const unsubscribe = onMessageListener().then((payload: any) => {
            console.log('Foreground message received:', payload);
            if (payload.notification) {
                toast({
                    variant: 'success',
                    title: payload.notification.title,
                    description: payload.notification.body,
                });
            }
        });
        return () => {
            unsubscribe.catch(err => console.error('Failed to unsubscribe from onMessage listener', err));
        };
    }, [toast]);

    return null; // This component does not render anything.
};

export default PushNotificationManager;
