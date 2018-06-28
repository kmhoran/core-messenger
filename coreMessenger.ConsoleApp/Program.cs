using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Net.Security;

namespace coreMessenger.ConsoleApp
{
    class Program
    {
        static readonly string baseUrl = "https://127.0.0.1:5001";
        

        // Trust all SSL certificates -- not for production!!!
        static bool ValidateCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors)
        {
              return true;
        }

        static async Task Main(string[] args)
        {
          ServicePointManager
            .ServerCertificateValidationCallback += new RemoteCertificateValidationCallback(ValidateCertificate);
          HttpClient httpClient = new HttpClient();
          Console.Write("Username: ");
          string username = Console.ReadLine();
          Console.Write("Password: ");
          var password = "";
          while(true)
          {
            var key = Console.ReadKey(intercept: true);
            if(key.Key == ConsoleKey.Enter) break;
            password += key.KeyChar;
          }
          ServicePointManager.ServerCertificateValidationCallback += new System.Net.Security
              .RemoteCertificateValidationCallback(ValidateCertificate); 
          var hubConnection = new HubConnectionBuilder()
            .WithUrl($"{baseUrl}/chat", options =>
            {
              options.AccessTokenProvider = async () =>
              {
                var stringData = JsonConvert.SerializeObject(new
                {
                  username, password
                });
                var content = new StringContent(stringData);
                content.Headers.ContentType =
                          new MediaTypeHeaderValue("application/json");
                var response = await httpClient.PostAsync(
                            $"{ baseUrl }/api/token", content);
                response.EnsureSuccessStatusCode();
                return await
                  response.Content.ReadAsStringAsync();
              };
            })
            .Build();
          hubConnection.On<string, string>("newMessage",
            (sender, message) =>
                Console.WriteLine($"{sender}: {message}"));
    
          await hubConnection.StartAsync();
    
          System.Console.WriteLine("\nConnected!");
    
          while(true)
          {
            var message = Console.ReadLine();
            await hubConnection.SendAsync("SendMessage", message);
          }
        } 
    }
}
