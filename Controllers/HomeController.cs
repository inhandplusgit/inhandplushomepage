using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using inhandhp.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace inhandhp.Controllers
{
    public class HomeController : Controller
    {
        protected readonly IConfiguration Configuration;
        protected readonly IHostingEnvironment HostingEnvironment;

        public HomeController(IConfiguration configuration, IHostingEnvironment hostingEnv)
        {
            this.Configuration = configuration;
            this.HostingEnvironment = hostingEnv;
        }

        public IActionResult Index()
        {
            //return View();

            if(this.HostingEnvironment.IsDevelopment())
            {
                return Redirect("http://localhost:52673/homepage/pages/home.html");
            } 
            else
            {
                return Redirect("https://www.inhandplus.com/homepage/pages/home.html");
            }
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
