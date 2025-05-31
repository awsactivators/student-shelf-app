# student-shelf-app


create update migration of db table
npx sequelize-cli migration:generate --name update-user-table

create new model migration
npx sequelize-cli model:generate --name Listing --attributes title:string,description:text,category:string,price:decimal,image:string,userId:integer


migrate update
npx sequelize-cli db:migrate

verify table schema
DESC Users;

re-track .env
git rm --cached .env
git commit -m "Stop tracking .env file"


<!--  - on messsage when a user clicks on the user name on the header it should route to the users profile page -->