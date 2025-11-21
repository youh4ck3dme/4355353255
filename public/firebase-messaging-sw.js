// Scripts for Firebase
// IMPORTANT: Make sure to update the Firebase version to the one you are using in your project
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
// Get this from your Firebase project settings.
const firebaseConfig = {
    apiKey: self.location.search.split('apiKey=')[1].split('&')[0],
    authDomain: self.location.search.split('authDomain=')[1].split('&')[0],
    projectId: self.location.search.split('projectId=')[1].split('&')[0],
    storageBucket: self.location.search.split('storageBucket=')[1].split('&')[0],
    messagingSenderId: self.location.search.split('messagingSenderId=')[1].split('&')[0],
    appId: self.location.search.split('appId=')[1].split('&')[0],
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
