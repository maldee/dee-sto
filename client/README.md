## API Update (api directory)

### Database migration resetting

1. cd api
2. dotnet ef database drop
3. delete Migrations folder manually
4. dotnet ef migrations add <name> -o Data/Migrations
5. dotnet watch run

## Run client (client directory)

1. cd client
2. `npm start`

## Build client (client directory)
`npm run build`

Your app is ready to be deployed!

### Reset Git (Optional)

1. git config  --unset user.name
2. git config  --unset user.email
3. git config  --unset credential.helper
4. git remote rm origin
5. git remote rm heroku
6. delete gitignore
7. dotnet new gitignore
8. git branch -M main
9. git remote add origin <gitrepourl>

### Git push default (deestore directory)

1. git add .
2. git comit -m "mergete"
3. git push -u origin main

### Git push with merge optional (deestore directory)

1. git add .
2. git comit -m "mergete"
3. git push -u origin Inventory
4. go to github
5. click merge pull request
6. click pull request
7. click merge

<!-- "build": "(if exist ..\\API\\wwwroot rmdir /s /q ..\\API\\wwwroot) && react-scripts build && move build ../API/wwwroot", -->

