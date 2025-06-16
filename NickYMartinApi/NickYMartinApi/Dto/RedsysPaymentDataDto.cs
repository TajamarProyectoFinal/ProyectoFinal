namespace NickYMartinApi.Dto
{
    public class RedsysPaymentDataDto
    {
        public string Ds_SignatureVersion { get; set; } = "HMAC_SHA256_V1";
        public string? Ds_MerchantParameters { get; set; }
        public string? Ds_Signature { get; set; }
        public string? RedsysTpvsUrl { get; set; }
    }
}
