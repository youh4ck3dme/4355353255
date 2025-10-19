#!/bin/bash

echo "Starting overall diagnostics for the app..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "node_modules not found. Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Failed to install dependencies"
        exit 1
    fi
fi

# Run linting
echo "Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix the issues."
    exit 1
fi

# Run build
echo "Running Next.js build..."
npm run build
if [ $? -ne 0 ]; then
    echo "Build failed. Please fix the issues."
    exit 1
fi

echo "Diagnostics completed successfully! The app is ready to run."
