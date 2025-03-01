"use server"

import { Timestamp } from "firebase-admin/firestore";
import { db } from "../lib/firebase";
import { auth } from "firebase-admin";

export async function createSocialLinks({
    profileId,
    github,
    instagram,
    linkedin,
    twitter
}: {
    profileId: string;
    github: string;
    instagram: string;
    linkedin: string;
    twitter: string
}){

    const session = await auth()

    if(!session) return false

    try {
        await db.collection('profiles').doc(profileId).update({
            socialMedia: {
                github,
                instagram,
                linkedin,
                twitter
            },
            updateAt: Timestamp.now().toMillis()
        })

        return true
    } catch(err){
        console.log(err)
        return false
    }
}
