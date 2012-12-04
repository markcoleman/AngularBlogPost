namespace AngularBlog.Models
{
    public class TransferRequest
    {
        public int SourceId { get; set; }
        public int DestinationId { get; set; }
        public decimal Amount { get; set; }
    }
}