const firebaseConfig = {
  apiKey: "AIzaSyC_OOaVflpegp2W85325vyIFqZUVHo0wm0",
  authDomain: "survey-app-hybrid.firebaseapp.com",
  projectId: "survey-app-hybrid",
  storageBucket: "survey-app-hybrid.appspot.com",
  messagingSenderId: "866415826823",
  appId: "1:866415826823:web:462779add79085f541a522",
  measurementId: "G-T7S9CKNJ9B"
};

interface IEnvironment {
  production: boolean;
  api: {
    url: string;
  };
  firebase: typeof firebaseConfig;
}

export const environment = {
  production: false,
  api: {
    url: "http://localhost:3000",
  },
  firebase: firebaseConfig,
};