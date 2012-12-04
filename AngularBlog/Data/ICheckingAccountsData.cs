using System.Collections.Generic;
using AngularBlog.Models;

namespace AngularBlog.Data
{
    public interface ICheckingAccountsData
    {
        List<CheckingAccount> GetAll();
        CheckingAccount Get(int id);
        void Update(CheckingAccount account);
        void Delete(int id);
        void Add(CheckingAccount account);
    }
}