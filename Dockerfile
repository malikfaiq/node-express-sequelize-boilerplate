# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm cache clean --force

RUN npm install

# Copy all app files to the container
COPY . .

# Expose the app's port (3000)
EXPOSE 3000
# Start the app
CMD ["./start.sh"]