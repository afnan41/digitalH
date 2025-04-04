FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the backend files into the container
COPY backend/ .

# Expose the port that the server will run on
EXPOSE 5000

# Run the backend server
CMD ["npm", "start"]
