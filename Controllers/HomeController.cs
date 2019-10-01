using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using inhandhp.Models;

namespace inhandhp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //return View();
            return Redirect("https://inhandhp.azurewebsites.net/homepage/pages/home.html");
            //return Redirect("https://www.inhandplus.com/homepage/pages/home.html");

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
