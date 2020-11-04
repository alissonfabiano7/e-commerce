using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Models
{
    public class Image
    {
        public int Id { get; set; }

        public string Path { get; set; }

        public string OriginalName { get; set; }

        public int Ordering { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductId { get; set; }
        public Product Product{ get; set; }

        [NotMapped]
        [DisplayName("Upload File")]
        public List<IFormFile> ImageFile { get; set; }

        [NotMapped]
        public List<string> Auxiliary { get; set; }
    }
}