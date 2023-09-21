FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-env
WORKDIR /API

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
WORKDIR /API
COPY --from=build-env /API/out .
ENTRYPOINT ["dotnet", "aspnetcoreapp.dll"]