# student-shelf-app


create update migration of db table
npx sequelize-cli migration:generate --name update-user-table

create new model migration
npx sequelize-cli model:generate --name Listing --attributes title:string,description:text,category:string,price:decimal,image:string,userId:integer


migrate update
npx sequelize-cli db:migrate

verify table schema
DESC Users;

