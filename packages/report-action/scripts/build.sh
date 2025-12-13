#!/bin/bash

set -e

echo "🔨 Building Canyon Report Action..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🏗️  Compiling TypeScript..."
npm run build

# Bundle with ncc
echo "📦 Bundling with ncc..."
npx ncc build dist/index.js -o dist --minify

echo "✅ Build completed successfully!"
echo "📁 Output: dist/index.js"