declare namespace ReactNavigation {
    export interface RootParamList {
        Home: undefined
        CarDetails: { car : any } | undefined
        Scheduling: { car : any } | undefined
        SchedulingComplete: undefined
        SchedulingDetails: { car, dates: any} | undefined
        MyCars: undefined
    }
} 