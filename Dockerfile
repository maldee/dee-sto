FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

# copy csproj and restore as distinct layers
COPY . ./
RUN dotnet restore

# copy everything else and build
RUN dotnet publish -c Release -o out

# build a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
COPY --from=build-env /App/out .

ENTRYPOINT ["dotnet", "API.dll"]