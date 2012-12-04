using System;
using Nancy;
using Nancy.ModelBinding;

namespace AngularBlog.Modules
{
    public class ApiError
    {
        public string ErrorMessage { get; set; }
        public int ErrorCode { get; set; }
        public string ErrorName { get; set; }
    }

    public class TransfersModule : NancyModule
    {
        private readonly ICheckingAccountsData _accountsData;

        public TransfersModule(ICheckingAccountsData accountsData) : base("/api")
        {
            _accountsData = accountsData;

            Post["/PerformTransfer"] = parameters =>
                {

                    var account = this.Bind<TransferRequest>();

                    CheckingAccount source = _accountsData.Get(account.SourceId);
                    CheckingAccount destination = _accountsData.Get(account.DestinationId);

                    if (source.Balance < account.Amount)
                    {
                        return Response.AsJson(new ApiError
                            {
                                ErrorMessage = "Not enough money from source share.",
                                ErrorCode = 1234,
                                ErrorName = "not_enough_money"
                            }, HttpStatusCode.BadRequest);
                    }


                    source.Balance -= account.Amount;
                    destination.Balance += account.Amount;

                    source.RecentTransactions.Insert(0, new RecentTransaction
                        {
                            Amount = account.Amount,
                            Comment = "Transfer to " + destination.Description,
                            OccuredOn = DateTime.Now.ToString()
                        });

                    
                    destination.RecentTransactions.Insert(0, new RecentTransaction
                        {
                            Amount = account.Amount,
                            Comment = "Transfer from " + source.Description,
                            OccuredOn = DateTime.Now.ToString()
                        });


                    return new Response
                        {
                            StatusCode = HttpStatusCode.Created
                        };
                };
        }
    }

    public class TransferRequest
    {
        public int SourceId { get; set; }
        public int DestinationId { get; set; }
        public decimal Amount { get; set; }
    }

    public class BalancesModule : NancyModule
    {
        private readonly ICheckingAccountsData _accountsData;

        public BalancesModule(ICheckingAccountsData accountsData) : base("/api")
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
}