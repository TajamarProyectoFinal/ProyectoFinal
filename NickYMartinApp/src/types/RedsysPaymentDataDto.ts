export interface RedsysPaymentDataDto {
    ds_SignatureVersion: string; // <-- Nota: ds_ en min�scula
    ds_MerchantParameters: string; // <-- Nota: ds_ en min�scula
    ds_Signature: string; // <-- Nota: ds_ en min�scula
    redsysTpvsUrl: string; // <-- Nota: redsysTpvsUrl en min�scula
}