export interface Briefing {
    afterPause: boolean;
    text: string;
}
export interface Detail {
    id: string; // xxx.xxx.xxx
    serialNumber: string;
}
export interface Conclution {
    enabled: boolean;
    text: string;
    control1: string;
    control2: string;
    control3: string;
}
export interface Instruction {
    id: number; // xxx.xxx.xxx
    name: string;
    detail: Detail;
    assemblyOutput: boolean;
    oneTimeAssembly: boolean;
    signatureMethod: 'first' | 'last' | 'all';
    collectDeviations: boolean;
    complitionCheck: boolean;
    сonclution: Conclution;
    outOfOrder: boolean;
    briefing: Briefing;
    organisation: string;
    developer: string;
    inspector: string;
    date: Date;
    version: number;
};