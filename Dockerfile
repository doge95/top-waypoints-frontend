FROM node:16.0
# set working direction
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
# add app
COPY . .
# start app
CMD ["npm", "start"]