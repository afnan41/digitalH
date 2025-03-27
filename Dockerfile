# Use the official Node.js image from Docker Hub
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files into the container
COPY backend/ .

# Expose port 5000 (the port your backend listens on)
EXPOSE 5000

# Run the backend server
CMD ["npm", "start"]
