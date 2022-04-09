
import { FirebaseModuleConfiguration } from "@nuxtjs/firebase"


const config: FirebaseModuleConfiguration = {
    config: {
        apiKey: "AIzaSyCTvLfpI-aVfTbU6eWgvNX2EOSi_4K3GrU",
        authDomain: "zloi-space.firebaseapp.com",
        projectId: "zloi-space",
        storageBucket: "zloi-space.appspot.com",
        messagingSenderId: "719482627707",
        appId: "1:719482627707:web:17692fd7541146ef9e24de",
        measurementId: "G-J8NSS1G2LL",
    },
    services: {
        analytics: {
            collectionEnabled: true
        },
    },
}

export default config