"use client"
import { auth } from '@/configs/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import toast from 'react-hot-toast';

function Authentication({ children }) {
    const provider = new GoogleAuthProvider();

    const onSignInClick = () => {
        console.log("CLICKL")
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user)
            }).catch((error) => {
                toast.error("Error signing in with Google. Please try again after sometime.", {
                    style: {
                        background: '#1e1e1e',
                        color: '#ffffff',
                        border: '1px solid #333'
                    },
                });
            });
    }
    return (
        <div onClick={() => onSignInClick()}>{children}</div>
    )
}

export default Authentication