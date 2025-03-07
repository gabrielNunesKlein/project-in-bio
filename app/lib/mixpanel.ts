import mixpanel from "mixpanel"

const mixPanelEvent = mixpanel.init("57201289a4b4606ac88a674be6043d48")

export function trackServerEvent(eventName: string, properties: any){
    if(process.env.NODE_ENV === "development") return


    mixPanelEvent.track(eventName, properties)
}