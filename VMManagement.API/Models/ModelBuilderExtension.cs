using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VMManagement.API.Context;
using VMManagement.API.Models;

namespace VMManagement.API.Data
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var context = serviceProvider.GetRequiredService<ApplicationDbContext>())
            {
                await context.Database.MigrateAsync(); // Aplica las migraciones pendientes

                var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

                // Crear roles si no existen
                var roles = new List<string> { "Cliente", "Administrador" };
                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole(role));
                    }
                }

                // Crear usuarios si no existen
                var users = new List<(string UserName, string Email, string Role)>
                {
                    ("roberth", "roberth@gmail.com", "Administrador"),
                    ("karina", "karina@gmail.com", "Administrador"),
                    ("sofia", "sofia@yahoo.com", "Cliente"),
                    ("johnny", "johnny@gmail.com", "Cliente")
                };

                foreach (var (userName, email, role) in users)
                {
                    if (await userManager.FindByEmailAsync(email) == null)
                    {
                        var user = new ApplicationUser
                        {
                            UserName = userName,
                            Email = email,
                            NormalizedUserName = userName.ToUpper(),
                            NormalizedEmail = email.ToUpper(),
                            EmailConfirmed = true
                        };

                        await userManager.CreateAsync(user, "Aa123456!");
                        await userManager.AddToRoleAsync(user, role);
                    }
                }
            }
        }
    }
}
