# Setup Project

Create .env file and then put your database configuration based on your local setup

```
DATABASE_URL="mysql://root:P@ssw0rd@localhost:3306/typescript_rest_api"
```
Then run the following command
```shell
npm install 

npx prisma migrate dev

npx prisma generate

npm run build

npm run start
```
