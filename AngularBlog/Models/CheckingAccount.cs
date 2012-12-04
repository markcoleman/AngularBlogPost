using System.Collections.Generic;

namespace AngularBlog.Models
{
    public class CheckingAccount
    {

        public string Description { get; set; }
        public decimal Balance { get; set; }
        public int Id { get; set; }

        public IList<RecentTransaction> RecentTransactions { get; set; }
    }
}