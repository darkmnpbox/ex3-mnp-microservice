FROM node:14.18.3

# ENV PORT=4001 \
#     DB_HOST=127.0.0.1 \
#     DB_PORT=5432 \
#     DB_USERNAME=test \
#     DB_PASSWORD=Niyas123 \
#     DB_DATABASE=test_typeorm \
#     BROKER_URL=http://127.0.0.1:5672

WORKDIR /home/src/app

COPY . .

RUN npm install

RUN npm run build

# RUN npm run migration:generate -- DepartmentEmpoyee

# RUN npm run migration:run

CMD [ "node", "dist/src/main.js" ]