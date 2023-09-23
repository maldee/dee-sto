FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /src

# copy csproj and restore as distinct layers
COPY src/*.csproj .
RUN dotnet restore

# copy everything else and build
COPY src .
RUN dotnet publish -c Release -o /publish

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 as runtime
WORKDIR /publish
COPY --from=build-env /publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "API.dll"]