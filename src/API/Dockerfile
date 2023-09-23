FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app
EXPOSE 80

# copy csproj and restore as distinct layers
COPY *.csproj .
RUN dotnet restore

COPY . .
WORKDIR /src/API
RUN dotnet build -c Release -o /app

# copy everything else and build
FROM build AS publish
RUN dotnet publish -c Release -o /app

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 as final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "API.dll"]