using System.Collections.Generic;

namespace AngularBlog.Modules
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