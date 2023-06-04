# Build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /source

# Copy csproj and restore dependencies
COPY *.csproj .
RUN dotnet restore --use-current-runtime 

# Copy the remaining source code
COPY . .

# Build the application
RUN dotnet publish --use-current-runtime --self-contained false -o /app

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app .

# Set the entry point
ENTRYPOINT ["dotnet", "task-management.dll"]
