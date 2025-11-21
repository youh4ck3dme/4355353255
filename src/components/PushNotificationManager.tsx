'use client';

import { useEffect } from 'react';
import { getMessagingToken, onMessageListener } from '@/lib/firebase-messaging';
import { useToast } from './ui/use-toast';
import { useFirebase } from '@/firebase/provider';

const PushNotificationManager = () => {
    const { toast } = useToast();
    const { user, isLoading } = useFirebase();

    useEffect(() => {
        // Only run after user state is determined
        if (isLoading) return;
        
        // Register the service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/firebase-messaging-sw.js')
                .then((registration) => {
                    console.log('Service Worker registration successful, scope is:', registration.scope);
                })
                .catch((err) => {
                    console.log('Service Worker registration failed, error:', err);
                });
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
             getMessagingToken();
        }
    }, [user, isLoading]);

    useEffect(() => {
        const unsubscribe = onMessageListener().then((payload: any) => {
            console.log('Foreground message received:', payload);
            toast({
                variant: 'success',
                title: payload.notification.title,
                description: payload.notification.body,
            });
        });
        return () => {
            unsubscribe.catch(err => console.error('Failed to unsubscribe from onMessage listener', err));
        };
    }, [toast]);

    return null; // This component does not render anything.
};

export default PushNotificationManager;
