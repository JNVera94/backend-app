ARG NODE_VERSION=20.1.0

FROM node:${NODE_VERSION}-alpine



WORKDIR /usr/src/app

# Create the directory where the app will be built and give ownership to node user
RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

# Copy package.json and package-lock.json into the image.
COPY package*.json ./

# Download dependencies as a separate step to take advantage of Docker's caching.
RUN --mount=type=cache,target=/root/.npm \
    npm install 

# Use production node environment by default.
ENV NODE_ENV production

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "start:dev"]

# Run the application as a non-root user.
USER node