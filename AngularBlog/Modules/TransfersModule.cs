using System;
using AngularBlog.Data;
using AngularBlog.Models;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;

namespace AngularBlog.Modules
{
    public class TransfersModule : NancyModule
    {
        private readonly ICheckingAccountsData _accountsData;

        public TransfersModule(ICheckingAccountsData accountsData) : base("/api")
        {
            this.RequiresAuthentication();
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
                            Amount = -account.Amount,
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
}