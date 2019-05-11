﻿namespace EOD.API
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    using EOD.Commons.Helpers;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;

    using Swashbuckle.AspNetCore.Swagger;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            Bootstrap(services);
            ConfigureSwagger(services);
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("policy");
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Rentall API"));
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
        }

        private static void Bootstrap(IServiceCollection services)
        {
            services.AddCors(opt => opt.AddPolicy("policy", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        private void ConfigureToken(IServiceCollection services)
        {
            IConfigurationSection appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(
                x =>
                    {
                        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    }).AddJwtBearer(
                x =>
                    {
                        x.RequireHttpsMetadata = false;
                        x.SaveToken = true;
                        x.TokenValidationParameters = new TokenValidationParameters()
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key),
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });
        }

        private static void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(
                c =>
                    {
                        c.SwaggerDoc("v1", new Info { Title = "Rentall API", Version = "v1" });
                        c.AddSecurityDefinition(
                            "Bearer",
                            new ApiKeyScheme
                            {
                                Description =
                                        "JWT Authorization header using the Bearer scheme. Example: \"Authorization: bearer {token}\"",
                                Name = "Authorization",
                                In = "header",
                                Type = "apiKey"
                            });
                        c.AddSecurityRequirement(
                            new Dictionary<string, IEnumerable<string>> { { "Bearer", Enumerable.Empty<string>() } });
                    });
        }
    }
}
