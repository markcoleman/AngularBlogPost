using System;
using System.Collections.Generic;
using AngularBlog.Models;
using Nancy;
using Nancy.ModelBinding;

namespace AngularBlog.Modules
{
    public class AuthenticateModule : NancyModule
    {
        public AuthenticateModule() : base("/api")
        {
            Post["/AuthenticateUser"] = parameters =>
                {
                    var bind = this.Bind<LoginRequest>();

                    //do something with request.Username and request.Password.

                    var response = new Response
                        {
                            StatusCode = HttpStatusCode.OK
                        };

                    response.AddCookie("valid", bind.Username, DateTime.Now.AddMinutes(5));
                    return response;
                };
            Get["/LogOff"] = parameters =>
                {
                    var response = new Response
                        {
                            StatusCode = HttpStatusCode.OK
                        };

                    //clear the cookie
                    response.AddCookie("valid", null, DateTime.Now.AddYears(-5));
                    return response;
                };
        }
    }
}