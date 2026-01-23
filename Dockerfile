# Dockerfile
 
# Use an LTS node alpine image as a base image.
FROM node:20-alpine

# Set the working directory.
WORKDIR /app
# Copy the package.json and lockfile.
COPY package.json package-lock.json ./
 
# Install application dependencies.
RUN npm ci
 
# Copy the rest of the application files.
COPY . .
 
# Expose the port.
EXPOSE 3000
 
# Run the application.
CMD ["npm", "run", "dev"]
