// ===== QUEEN RAT AI — FIREBASE AUTH & USER DATA MANAGER =====
// Handles Firebase Initialization, Google Login, and Cloud Sync

(function () {
    'use strict';

    // Default or stored Firebase configuration
    // Configured with the user's Firebase project
    const DEFAULT_CONFIG = {
        apiKey: "AIzaSyBvpYXotEqA8OhFkMmIOgrcRoDMOiAtCRU",
        authDomain: "spoken-english-ff3df.firebaseapp.com",
        projectId: "spoken-english-ff3df",
        storageBucket: "spoken-english-ff3df.firebasestorage.app",
        messagingSenderId: "200402529289",
        appId: "1:200402529289:web:51d785d79ec51a0c3b1cd8",
        measurementId: "G-K2G4PW3ZHF"
    };

    const authManager = {
        app: null,
        auth: null,
        db: null,
        analytics: null,
        currentUser: null,
        isReady: false,
        authListeners: [],

        init() {
            // Immediate synchronous check for cached auth to prevent modal flicker on reload
            const cachedUser = localStorage.getItem('sw_cached_user');
            if (cachedUser) {
                try {
                    this.currentUser = JSON.parse(cachedUser);
                    document.documentElement.classList.add('user-cached-logged-in');
                } catch (e) {}
            }

            const config = this.getConfig();

            // Check if window.firebase is loaded from CDN
            if (typeof firebase === 'undefined') {
                console.warn('Firebase SDK not loaded.');
                return;
            }

            // If apiKey and projectId are present, initialize Firebase
            if (config && config.apiKey && config.projectId) {
                try {
                    if (!firebase.apps.length) {
                        this.app = firebase.initializeApp(config);
                    } else {
                        this.app = firebase.app();
                    }

                    this.auth = firebase.auth();
                    if (firebase.firestore) {
                        this.db = firebase.firestore();
                    }
                    if (firebase.analytics && config.measurementId) {
                        try {
                            this.analytics = firebase.analytics();
                        } catch (anErr) {
                            console.warn('Analytics init notice:', anErr);
                        }
                    }
                    this.isReady = true;

                    // Listen for auth state changes
                    this.auth.onAuthStateChanged(user => {
                        this.currentUser = user;
                        if (user) {
                            localStorage.setItem('sw_cached_user', JSON.stringify({
                                uid: user.uid,
                                displayName: user.displayName,
                                email: user.email,
                                photoURL: user.photoURL
                            }));
                            document.documentElement.classList.add('user-cached-logged-in');
                            this.syncUserToCloud(user);
                        } else {
                            localStorage.removeItem('sw_cached_user');
                            document.documentElement.classList.remove('user-cached-logged-in');
                        }
                        this.notifyAuthListeners(user);
                    });

                    // Handle redirect result (mandatory for mobile Google login & Vercel)
                    if (this.auth.getRedirectResult) {
                        this.auth.getRedirectResult().then(result => {
                            if (result && result.user) {
                                console.log("Firebase redirect sign-in completed:", result.user);
                                this.currentUser = result.user;
                                localStorage.setItem('sw_cached_user', JSON.stringify({
                                    uid: result.user.uid,
                                    displayName: result.user.displayName,
                                    email: result.user.email,
                                    photoURL: result.user.photoURL
                                }));
                                document.documentElement.classList.add('user-cached-logged-in');
                                this.syncUserToCloud(result.user);
                                this.notifyAuthListeners(result.user);
                            }
                        }).catch(redirectErr => {
                            console.error('Firebase getRedirectResult error:', redirectErr);
                            const gateMsg = document.getElementById('gate-status-msg');
                            if (gateMsg) {
                                if (redirectErr.code === 'auth/unauthorized-domain') {
                                    gateMsg.innerHTML = `⚠️ <strong>Domain Unauthorized in Firebase</strong><br>
                                    Please add <code>${window.location.hostname}</code> to <strong>Firebase Console &gt; Authentication &gt; Settings &gt; Authorized domains</strong>.`;
                                } else {
                                    gateMsg.textContent = redirectErr.message || 'Login error occurred.';
                                }
                                gateMsg.classList.remove('hidden');
                            }
                        });
                    }
                } catch (err) {
                    console.error('Firebase initialization error:', err);
                    this.isReady = false;
                }
            } else {
                console.info('Firebase awaiting user configuration keys.');
                this.isReady = false;
                if (cachedUser) {
                    this.notifyAuthListeners(this.currentUser);
                }
            }
        },

        isConfigured() {
            const cfg = this.getConfig();
            return Boolean(cfg && cfg.apiKey && cfg.projectId);
        },

        getConfig() {
            const stored = localStorage.getItem('sw_firebase_config');
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed && parsed.apiKey && parsed.apiKey.trim() !== '') {
                        return { ...DEFAULT_CONFIG, ...parsed };
                    }
                } catch (e) {}
            }
            return DEFAULT_CONFIG;
        },

        saveConfig(newConfig) {
            localStorage.setItem('sw_firebase_config', JSON.stringify(newConfig));
            // Re-init with new config
            try {
                if (firebase.apps.length) {
                    firebase.app().delete().then(() => {
                        this.init();
                    });
                } else {
                    this.init();
                }
            } catch (e) {
                this.init();
            }
        },

        onAuthStateChanged(callback) {
            if (typeof callback === 'function') {
                this.authListeners.push(callback);
                // Immediately call if already resolved
                if (this.currentUser) {
                    callback(this.currentUser);
                }
            }
        },

        notifyAuthListeners(user) {
            this.authListeners.forEach(cb => {
                try {
                    cb(user);
                } catch (e) {
                    console.error('Error in auth listener:', e);
                }
            });
        },

        async signInWithGoogle() {
            if (!this.isReady || !this.auth) {
                throw new Error('CONFIG_REQUIRED');
            }

            // Detect in-app browsers (Instagram, WhatsApp, Facebook, LinkedIn webviews)
            // where Google blocks OAuth sign-ins with 403: disallowed_useragent
            const isInApp = /FBAN|FBAV|Instagram|Line|Twitter|MicroMessenger|WhatsApp/i.test(navigator.userAgent);
            if (isInApp) {
                throw new Error('IN_APP_BROWSER');
            }

            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            provider.setCustomParameters({ prompt: 'select_account' });

            // Ensure session persistence is explicitly set to LOCAL storage
            try {
                if (firebase.auth.Auth && firebase.auth.Auth.Persistence && firebase.auth.Auth.Persistence.LOCAL) {
                    await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                }
            } catch (pErr) {
                console.warn('Set persistence note:', pErr);
            }

            // Use signInWithPopup first for ALL devices (including mobile).
            // On mobile Chrome & Safari, user-click-triggered popups work cleanly and avoid
            // cross-origin cookie loss (which causes Vercel mobile redirects to lose login state).
            try {
                const result = await this.auth.signInWithPopup(provider);
                if (result && result.user) {
                    this.currentUser = result.user;
                    localStorage.setItem('sw_cached_user', JSON.stringify({
                        uid: result.user.uid,
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL
                    }));
                    document.documentElement.classList.add('user-cached-logged-in');
                    await this.syncUserToCloud(result.user);
                    this.notifyAuthListeners(result.user);
                    return result.user;
                }
            } catch (error) {
                console.warn('Popup login notice, evaluating fallback:', error);
                // User intentionally closed the popup
                if (error.code === 'auth/popup-closed-by-user') {
                    return null;
                }
                // If popup was blocked by browser security, fallback to redirect
                if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                    console.log('Popup blocked by browser, falling back to signInWithRedirect...');
                    return await this.auth.signInWithRedirect(provider);
                }
                throw error;
            }
        },

        async signOut() {
            if (this.auth) {
                await this.auth.signOut();
            }
            this.currentUser = null;
            localStorage.removeItem('sw_cached_user');
            this.notifyAuthListeners(null);
        },

        async syncUserToCloud(user) {
            if (!this.db || !user) return;
            try {
                const userRef = this.db.collection('users').doc(user.uid);
                await userRef.set({
                    uid: user.uid,
                    displayName: user.displayName || 'Tamil Learner',
                    email: user.email,
                    photoURL: user.photoURL,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            } catch (err) {
                console.warn('Cloud sync error:', err);
            }
        },

        async saveUserProgress(progressData) {
            if (!this.currentUser) return;
            // Always save to localStorage keyed by user
            const localKey = `sw_progress_${this.currentUser.uid}`;
            const existing = JSON.parse(localStorage.getItem(localKey) || '{}');
            const updated = { ...existing, ...progressData, updatedAt: new Date().toISOString() };
            localStorage.setItem(localKey, JSON.stringify(updated));

            // Sync to Firestore if ready
            if (this.db && this.isReady) {
                try {
                    // 1. Save detailed progress document
                    await this.db.collection('users').doc(this.currentUser.uid).collection('progress').doc('stats').set(updated, { merge: true });
                    // 2. Save high-level learning percentage on the user document for fast lookup & leaderboards
                    await this.db.collection('users').doc(this.currentUser.uid).set({
                        learningPercentage: updated.learningPercentage || 0,
                        lastActive: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true });
                } catch (e) {
                    console.warn('Progress cloud sync error:', e);
                }
            }
        },

        async loadUserProgress() {
            if (!this.currentUser) return null;
            const localKey = `sw_progress_${this.currentUser.uid}`;
            let progress = {};
            try {
                progress = JSON.parse(localStorage.getItem(localKey) || '{}');
            } catch (e) {}

            if (this.db && this.isReady) {
                try {
                    const doc = await this.db.collection('users').doc(this.currentUser.uid).collection('progress').doc('stats').get();
                    if (doc.exists) {
                        const cloudData = doc.data();
                        progress = { ...progress, ...cloudData };
                        localStorage.setItem(localKey, JSON.stringify(progress));
                    }
                } catch (e) {
                    console.warn('Could not fetch cloud progress:', e);
                }
            }
            return progress;
        },

        getUserProgress() {
            if (!this.currentUser) return null;
            const localKey = `sw_progress_${this.currentUser.uid}`;
            try {
                return JSON.parse(localStorage.getItem(localKey) || '{}');
            } catch (e) {
                return null;
            }
        }
    };

    window.authManager = authManager;
})();
