export interface RedsysPaymentDataDto {
    ds_SignatureVersion: string; // <-- Nota: ds_ en minúscula
    ds_MerchantParameters: string; // <-- Nota: ds_ en minúscula
    ds_Signature: string; // <-- Nota: ds_ en minúscula
    redsysTpvsUrl: string; // <-- Nota: redsysTpvsUrl en minúscula
}