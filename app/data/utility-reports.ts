export type Status = "Waiting" | "Proof ready" | "Approved" | "In production";
export const utilityReports:{region:string;name:string;status:Status;batch:string}[]=[
 {region:"Northern",name:"CCR report A",status:"Approved",batch:"Batch 01"},
 {region:"Central",name:"CCR report B",status:"Proof ready",batch:"Batch 01"},
 {region:"Coastal",name:"CCR report C",status:"Waiting",batch:"Batch 02"},
 {region:"Southern",name:"CCR report D",status:"In production",batch:"Batch 02"},
 {region:"Eastern",name:"CCR report E",status:"Approved",batch:"Batch 03"},
 {region:"Western",name:"CCR report F",status:"Proof ready",batch:"Batch 03"},
 {region:"Mountain",name:"CCR report G",status:"Waiting",batch:"Batch 04"},
];

export const normalizeReportQuery = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().toLowerCase();
