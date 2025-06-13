namespace NickYMartinApi.Interfaces
{
    public interface IEstadosPedido
    {
        public const string PENDIENTE = "Pendiente";
        public const string PROCESANDO = "Procesando";
        public const string ENVIADO = "Enviado";
        public const string ENTREGADO = "Entregado";
        public const string CANCELADO = "Cancelado";
        public const string REEMBOLSADO = "Reembolsado";
        public const string FALLIDO = "Fallido";
    }
}
