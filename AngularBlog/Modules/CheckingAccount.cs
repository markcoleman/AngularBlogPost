using System;
using System.Collections.Generic;

namespace AngularBlog.Modules
{
    public class CheckingAccount
    {

        public string Description { get; set; }
        public decimal Balance { get; set; }
        public int Id { get; set; }

        public IList<RecentTransaction> RecentTransactions { get; set; }
    }

    public class RecentTransaction
    {
        public string OccuredOn { get; set; }
        public string Comment { get; set; }
        public decimal Amount { get; set; }
    }
}