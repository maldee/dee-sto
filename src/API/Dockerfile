FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /api

# copy csproj and restore as distinct layers
COPY api/*.csproj .
RUN dotnet restore

# copy everything else and build
COPY api .
RUN dotnet publish -c Release -o /publish

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 as runtime
WORKDIR /publish
COPY --from=build-env /publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "API.dll"]