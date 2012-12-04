using System;
using System.Collections.Generic;
using AngularBlog.Models;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Responses;
using Nancy.TinyIoc;

namespace AngularBlog.Modules
{
    public class AuthenticationBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);

            pipelines.BeforeRequest += (ctx) =>
                {
                    string cookie;

                    ctx.Request.Cookies.TryGetValue("valid", out cookie);

                    //do something to populate the user identity
                    if (!string.IsNullOrEmpty(cookie))
                    {
                        ctx.CurrentUser = new DemoUserIdentity
                            {
                                UserName = cookie,
                                Claims = BuildClaims(cookie)
                            };
                    }

                    return null;
                };

            pipelines.AfterRequest += (ctx) =>
                {
                    // If status code comes back as Unauthorized then
                    // forward the user to the login page
                    if (ctx.Response.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        var j = new JsonResponse<ApiError>(new ApiError {ErrorCode = 401, ErrorMessage = "user is not authenticated", ErrorName = "unauthorized"}, new DefaultJsonSerializer())
                            {
                                StatusCode = HttpStatusCode.Unauthorized
                            };

                        ctx.Response = j;
                    }
                };
        }

        private static IEnumerable<string> BuildClaims(string userName)
        {
            var claims = new List<string>();

            // Only bob can have access to SuperSecure
            if (String.Equals(userName, "bob", StringComparison.InvariantCultureIgnoreCase))
            {
                claims.Add("SuperSecure");
            }

            return claims;
        }
    }
}