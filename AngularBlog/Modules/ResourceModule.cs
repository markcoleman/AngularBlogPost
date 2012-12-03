using System;
using System.Collections.Generic;
using System.Linq;
using Nancy;
using Nancy.ModelBinding;
using Newtonsoft.Json;

namespace AngularBlog.Modules
{

    public class ResourceModule : NancyModule
    {
        private readonly ICheckingAccountsData _accountsData;

        public ResourceModule(ICheckingAccountsData accountsData) : base("/api")
        {
            
            _accountsData = accountsData;
            Get["/CheckingAccounts"] = parameters => { return Response.AsJson(accountsData.GetAll()); };

            Get["/CheckingAccounts/{id}"] = parameters =>
                {
                    int id = int.Parse(parameters.id);
                    CheckingAccount checkingAccount = accountsData.Get(id);

                    if (checkingAccount == null)
                    {
                        return new Response
                            {
                                StatusCode = HttpStatusCode.NotFound
                            };
                    }
                    return Response.AsJson(checkingAccount);
                };
            Put["/CheckingAccounts/{id}"] = parameters =>
                {
                    var account = this.Bind<CheckingAccount>();

                    _accountsData.Update(account);

                    return new Response
                        {
                            StatusCode = HttpStatusCode.OK
                        };
                };

            Delete["/CheckingAccounts/{id}"] = parameters =>
                {
                    int id = int.Parse(parameters.id);

                    _accountsData.Delete(id);

                    return new Response
                        {
                            StatusCode = HttpStatusCode.OK
                        };
                };

            Post["/CheckingAccounts"] = parameters =>
                {
                    var account = this.Bind<CheckingAccount>();

                    _accountsData.Add(account);

                    return new Response
                        {
                            StatusCode = HttpStatusCode.OK
                        };
                };
        }
    }

    public interface ICheckingAccountsData
    {
        List<CheckingAccount> GetAll();
        CheckingAccount Get(int id);
        void Update(CheckingAccount account);
        void Delete(int id);
        void Add(CheckingAccount account);
    }

    public class CheckingAccountsData : ICheckingAccountsData
    {
        private static readonly List<CheckingAccount> Accounts = new List<CheckingAccount>();

        static CheckingAccountsData()
        {
            var r = new Random();
            Accounts = Enumerable.Range(0, 10).Select(i => new CheckingAccount
                {
                    Id = i,
                    Balance = r.Next(5, 100),
                    Description = string.Format("Checking Account #{0}", i)
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

    public class CheckingAccount
    {

        public string Description { get; set; }
        public int Balance { get; set; }

        public int Id { get; set; }
    }
}