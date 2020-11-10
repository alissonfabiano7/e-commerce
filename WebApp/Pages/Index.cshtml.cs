using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Configuration;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly WebAppContext _context;

        public IndexModel(ILogger<IndexModel> logger, WebAppContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IList<Category> Category;
        public List<Product> Product;

        public IActionResult OnGet()
        {

            var param = new SqlParameter("@param", "ASFDASDFASDF");

            Category = _context.Category
                .FromSqlRaw("GetAllChildren @param", param).ToList();

            foreach(var item in Category)
            {
                Product = Product.MyCustomJoin(_context.Product.Where(m => m.CategoryId == item.Id).ToList());
            }


            return Page();

        }
    }
}




