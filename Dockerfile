# Use a lightweight Node.js image as base
FROM node:alpine

# Create and set the working directory
WORKDIR /usr/src/node-app

# Copy package.json and yarn.lock files first to leverage Docker layer caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Copy the rest of the application files
COPY --chown=node:node . .

# Expose the port that the app will listen on
EXPOSE 3000

# Run the application
CMD [ "npm", "start" ]
