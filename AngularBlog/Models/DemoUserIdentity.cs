using System.Collections.Generic;
using Nancy.Security;

namespace AngularBlog.Models
{
    public class DemoUserIdentity : IUserIdentity
    {
        public string UserName { get; set; }
        public IEnumerable<string> Claims { get; set; }
    }
}