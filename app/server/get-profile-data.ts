import "server-only"
import { db } from "../lib/firebase"
import { Link } from "../actions/add-custom-links";

export type ProfileData = {
    userId: string;
    totalVisits: number;
    createAt: number;
    socialMedia?: {
        github: string;
        instagram: string;
        linkedin: string;
        twitter: string;
    };
    link1?: Link,
    link2?: Link,
    link3?: Link,
    updatedAt?: number;
}

export type ProjectData = {
    userId: string;
    id: string;
    name: string;
    description: string;
    imagePath: string;
    url: string;
    createdAt: number;
    totalVisits?: number;
}

export async function getProfileData(profileId: string){

    const spanhot = await db.collection("profiles").doc(profileId).get()

    return spanhot.data() as ProfileData;

}

export async function getProjectesPrifile(profileId: string){
    const spnashot = await db.collection("projects").doc(profileId).collection("projects").get();

    return spnashot.docs.map((doc) => doc.data()) as ProjectData[]
}