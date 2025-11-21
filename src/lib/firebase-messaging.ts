'use client';

import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from './firebase-client';

export const getMessagingToken = async () => {
    let currentToken = '';
    
    if (!process.env.NEXT_PUBLIC_FCM_VAPID_KEY) {
        console.error("VAPID key is not set in environment variables. Cannot get FCM token.");
        return '';
    }

    try {
        const messaging = getMessaging(app);

        if (typeof window !== 'undefined' && 'Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                try {
                    const token = await getToken(messaging, {
                        vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
                    });
                    if (token) {
                        console.log('FCM Token:', token);
                        currentToken = token;
                        // TODO: Send this token to your server to store it for the current user
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                } catch (err) {
                    console.error('An error occurred while retrieving token. ', err);
                }
            } else {
                console.log('Unable to get permission to notify.');
            }
        }
    } catch (error) {
        console.error("Error initializing messaging:", error);
    }
    
    return currentToken;
};

export const onMessageListener = () => {
    const messaging = getMessaging(app);
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            resolve(payload);
        });
    });
};
