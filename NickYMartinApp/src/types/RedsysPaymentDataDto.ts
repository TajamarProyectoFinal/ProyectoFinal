export interface RedsysPaymentDataDto {
    Ds_SignatureVersion: string;
    Ds_MerchantParameters?: string; // El '?' indica que la propiedad es opcional (nullable en C#)
    Ds_Signature?: string;
    RedsysTpvsUrl?: string;
}