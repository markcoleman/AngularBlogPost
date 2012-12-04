using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularBlog.Modules
{
    public class CheckingAccountsData : ICheckingAccountsData
    {
        private static readonly List<CheckingAccount> Accounts = new List<CheckingAccount>();

        static CheckingAccountsData()
        {
            var r = new Random();
            Accounts = Enumerable.Range(0, 10).Select(i => new CheckingAccount
                {
                    Id = i,
                    Balance = r.Next(5, 1000),
                    Description = string.Format("Checking Account #{0}", i),
                    RecentTransactions = GetRecentTransactions(i)
                }).ToList();
        }

        private static IList<RecentTransaction> GetRecentTransactions(int index)
        {
            var r = new Random();
            return Enumerable.Range(0, 25).Select(i => new RecentTransaction
                {
                    Amount = -r.Next(1, 100),
                    Comment = "Debit",
                    OccuredOn = DateTime.Now.AddDays(-i).ToString()
                }).ToList();
        }

        public List<CheckingAccount> GetAll()
        {
            return Accounts;
        }

        public CheckingAccount Get(int id)
        {
            return Accounts.FirstOrDefault(a => a.Id == id);
        }

        public void Update(CheckingAccount account)
        {
            CheckingAccount checkingAccount = Accounts.Single(a => a.Id == account.Id);

            checkingAccount.Description = account.Description;
        }

        public void Delete(int id)
        {
            CheckingAccount checkingAccount = Accounts.Single(a => a.Id == id);
            Accounts.Remove(checkingAccount);
        }

        public void Add(CheckingAccount account)
        {
            int max = Accounts.Max(a => a.Id);
            account.Id = max + 1;
            Accounts.Add(account);
        }
    }
}