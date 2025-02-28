import "server-only"
import { db } from "../lib/firebase"

export type ProfileData = {
    userId: string;
    totalVisits: number;
    createAt: number;
}

export async function getProfileData(profileId: string){

    const spanhot = await db.collection("profiles").doc(profileId).get()

    return spanhot.data() as ProfileData;

}