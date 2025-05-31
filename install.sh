#!/bin/bash

set -e

echo "Updating system and installing Node.js, npm, and git..."
sudo apt update
sudo apt install -y nodejs npm git

echo "Cloning panel repo..."
REPO_URL="https://github.com/ATYWFRFG/chenuka.git"
if [ ! -d chenuka ]; then
  git clone "$REPO_URL" chenuka
fi
cd chenuka

echo "Installing panel dependencies..."
npm install

echo "Setting up environment file..."
cp .env.example .env

echo "Starting the panel..."
npm start
