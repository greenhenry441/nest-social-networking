import admin from 'firebase-admin';

if (!admin.apps.length) {
  // In a managed environment like Firebase Studio or Cloud Run,
  // it's best practice to use Application Default Credentials.
  // This lets the Admin SDK automatically find the credentials
  // without needing to manage service account key files or environment variables.
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
