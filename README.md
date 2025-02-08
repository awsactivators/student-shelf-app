# student-shelf-app


create update migration of db table
npx sequelize-cli migration:generate --name update-user-table

migrate update
npx sequelize-cli db:migrate

verify table schema
DESC Users;

