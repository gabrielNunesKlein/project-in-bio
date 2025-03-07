import { auth } from "@/app/lib/auth"
import { db } from "@/app/lib/firebase"
import stripe from "@/app/lib/stripe"
import { NextResponse } from "next/server"
import { trackServerEvent } from "@/app/lib/mixpanel"

export async function POST(req: Request){
    const { metadata, isSubscription } = await req.json()

    const price = isSubscription ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID : process.env.STRIPE_PRICE_ID

    const userSession = await auth()

    if(!userSession || !userSession?.user?.id || !userSession?.user?.email){
        return NextResponse.json({error: "Não Autorizado"}, { status: 401 })
    }

    const userId = userSession.user?.id
    const userEmail = userSession.user?.email
    const userName = userSession.user?.name

    const userRef = db.collection("users").doc(userId)
    const userDoc = await userRef.get()

    let customerId

    if(userDoc.exists){
        customerId = userDoc.data()?.customerId
    }

    if(!customerId){
        const newCustomer = await stripe.customers.create({
            email: userEmail,
            name: userName || "Sem Nome",
            metadata: {
                userId: userId
            }
        })

        customerId = newCustomer.id
        await userRef.update({ customerId })
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [{
            price: price,
            quantity: 1
        }],
        mode: isSubscription ? "subscription" : "payment",
        payment_method_types: isSubscription ? ["card"] : ["card", "boleto"],
        metadata,
        client_reference_id: userId,
        success_url: `${req.headers.get("origin")}/${metadata.profileId}`,
        cancel_url: `${req.headers.get("origin")}/${metadata.profileId}/upgrade`
    })

    trackServerEvent("checkout_created", {
        userId,
        price,
        isSubscription,
    });

    return NextResponse.json({
        sessionId: session.id
    })
}