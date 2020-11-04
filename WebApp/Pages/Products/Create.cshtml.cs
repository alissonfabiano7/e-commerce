using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Pages.Products
{
    public class CreateModel : PageModel
    {
        private readonly WebAppContext _context;

        private readonly IWebHostEnvironment _hostEnvironment;

        public CreateModel(WebAppContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;

        }

        public IActionResult OnGet()
        {
        ViewData["CategoryId"] = new SelectList(_context.Category, "Id", "Name");
            return Page();
        }

        [BindProperty]
        public Product Product { get; set; }

        [BindProperty]
        public Image Image { get; set; }

        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.





        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            if(ModelState.IsValid)
            {   

                if (Image.ImageFile != null)
                {
                    _context.Product.Add(Product);
                    await _context.SaveChangesAsync();
                    var query =
                        from product in _context.Product
                        orderby product.Id descending
                        select product.Id;
                    var lastId = query.Take(1).ToList();

                    string subdir = Path.Combine(_hostEnvironment.WebRootPath, "images", Product.Id.ToString());
                    Directory.CreateDirectory(subdir);

                    var imageOrderingAux = Image.Auxiliary;


                        foreach (IFormFile photo in Image.ImageFile)
                        {
                            
                            string uniqueFileName = Guid.NewGuid().ToString() + "_" + photo.FileName;
                            string filePath = Path.Combine(subdir, uniqueFileName);
                            photo.CopyTo(new FileStream(filePath, FileMode.Create));

                            Image.OriginalName = photo.FileName;
                            Image.Path = "images/" + Product.Id.ToString() + "/" + uniqueFileName;
                            Image.ProductId = lastId[0];
                            foreach (var image in imageOrderingAux)
                            {
                            if (image == photo.FileName)
                                {
                                Image.Ordering = imageOrderingAux.IndexOf(image);
                                break;
                                }
                            }
                            _context.Image.Add(Image);
                            await _context.SaveChangesAsync();
                            Image = new Image();
                        } 
                    
                        return RedirectToPage("~/Index"); 
                }
            }
            _context.Product.Add(Product);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
