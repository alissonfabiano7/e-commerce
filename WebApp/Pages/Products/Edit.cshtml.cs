using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Pages.Products
{
    public class EditModel : PageModel
    {
        private readonly WebAppContext _context;

        private readonly IWebHostEnvironment _hostEnvironment;

        public EditModel(WebAppContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            this._hostEnvironment = hostEnvironment;

        }

        [BindProperty]
        public Product Product { get; set; }
        [BindProperty]
        public Image Image { get; set; }

        public static int HelperId { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            Product = await _context.Product
                .Include(p => p.Category).Include(o => o.Image).FirstOrDefaultAsync(m => m.Id == id);

            HelperId = Product.Id;

            if (Product == null)
            {
                return NotFound();
            }
           ViewData["CategoryId"] = new SelectList(_context.Category, "Id", "Name");

            return Page();

        }


        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }


            string subdir = Path.Combine(_hostEnvironment.WebRootPath, "images", HelperId.ToString());

            var watcher = new FileSystemWatcher
            {
                Path = subdir,
                NotifyFilter = NotifyFilters.DirectoryName,
                Filter = subdir,
            };
            var task = Task.Run(() => watcher.WaitForChanged(WatcherChangeTypes.Deleted, 5000));

            while (task.Status != TaskStatus.Running)
            {
                Thread.Sleep(100);
            }

            try
            {
                Directory.Delete(subdir, true);
            }
            catch
            {
            }

            if (Image.ImageFile != null)
            {

                Directory.CreateDirectory(subdir);


                var oldImages = _context.Image.Where(images => images.ProductId == HelperId);
                _context.RemoveRange(oldImages.ToList());
                await _context.SaveChangesAsync();

                var imageOrderingAux = Image.Auxiliary;


                foreach (IFormFile photo in Image.ImageFile)
                {

                    string uniqueFileName = Guid.NewGuid().ToString() + "_" + photo.FileName;
                    string filePath = Path.Combine(subdir, uniqueFileName);
                    photo.CopyTo(new FileStream(filePath, FileMode.Create));

                    Image.OriginalName = photo.FileName;
                    Image.Path = "images/" + HelperId.ToString() + "/" + uniqueFileName;
                    Image.ProductId = HelperId;
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

            }



            _context.Attach(Product).State = EntityState.Modified;




            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(Product.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}
