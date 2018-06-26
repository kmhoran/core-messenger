using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
//using Microsoft.AspNetCore.Authentication.JwtBearer;


namespace coreMessenger.Hubs
{
    // [Authorize (AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme)]
    [Authorize]
    public class Chat : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync(
                "newMessage" , 
                Context.User.Identity.Name , 
                message );
        }
    }
}
