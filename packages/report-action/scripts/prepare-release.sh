#!/bin/bash

set -e

echo "🚀 Preparing Canyon Report Action for release..."

# Build the action
echo "🔨 Building..."
./scripts/build.sh

# Run tests
echo "🧪 Running tests..."
npm test

# Check if dist/index.js exists
if [ ! -f "dist/index.js" ]; then
  echo "❌ dist/index.js not found!"
  exit 1
fi

echo "📋 Release checklist:"
echo "✅ TypeScript compiled"
echo "✅ Bundled with ncc"
echo "✅ Tests passed"
echo ""
echo "📝 Next steps:"
echo "1. Commit dist/index.js to git"
echo "2. Create and push a git tag (e.g., v1.0.0)"
echo "3. Create GitHub release"
echo ""
echo "🎯 Ready for release!"