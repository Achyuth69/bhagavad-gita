FROM python:3.11.9-slim

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 10000

# Start command
CMD cd backend && uvicorn backend:app --host 0.0.0.0 --port $PORT
