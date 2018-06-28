using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using coreMessenger.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace coreMessenger.Web.Controllers
{
    public class TokenController: Controller
    {
        private readonly SignInManager<IdentityUser> SignInManager;
        private readonly IConfiguration config;

        public TokenController(
            SignInManager<IdentityUser> signInManager,
            IConfiguration config)
        {
            this.SignInManager = signInManager;
            this.config = config;
        }


        [HttpGet("api/token")]
        [Authorize]
        public IActionResult GetToken()
        {
            return Ok(GenerateToken(User.Identity.Name));
        }

        private string GenerateToken(string userId)
        {
            var key = new SymmetricSecurityKey(
                System.Text.Encoding.ASCII.GetBytes(
                    config["JwtKey"]));
            var claims = new [] 
            {
                new Claim(ClaimTypes.NameIdentifier, userId)
            };

            var credentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                "coreMessenger", 
                "coreMessenger", 
                claims, 
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost ("api/token")]
        public async Task<IActionResult> GetTokenForCredentialAsync(
            [FromBody] LoginRequest login)
        {
            var result = await this.SignInManager.PasswordSignInAsync(
                userName: login.Username, 
                password: login.Password,
                isPersistent: false,
                lockoutOnFailure: false);
            return result.Succeeded 
            ? (IActionResult) Ok(GenerateToken(login.Username))
            : Unauthorized();  
        }
        
    }   
}