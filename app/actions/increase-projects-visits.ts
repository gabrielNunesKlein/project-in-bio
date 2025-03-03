"use server"

import { FieldValue } from "firebase-admin/firestore"
import { db } from "../lib/firebase"

export async function increaseProjectsVisit(profileId: string, projectId: string){

    const projectFRef = db.collection("profiles").doc(profileId).collection("projects").doc(projectId)

    await db.runTransaction(async (transaction) => {
        const projectDoc = await transaction.get(projectFRef)

        if(!projectDoc.exists) return

        transaction.update(projectFRef, {
            totalVisit: FieldValue.increment(1)
        })
    })
}