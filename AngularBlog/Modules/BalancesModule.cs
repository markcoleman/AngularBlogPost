using AngularBlog.Data;
using AngularBlog.Models;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;

namespace AngularBlog.Modules
{
    public class BalancesModule : NancyModule
    {
        private readonly ICheckingAccountsData _accountsData;

        public BalancesModule(ICheckingAccountsData accountsData) : base("/api")
        {
            this.RequiresAuthentication();
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