#!/bin/bash
# Local preview server for The Bin Running Brothers site
# Usage: ./preview.sh

cd "$(dirname "$0")/bin-running-brothers"

echo "🚀 Starting local preview server..."
echo "📍 Site will be available at: http://localhost:8000"
echo "📁 Serving from: $(pwd)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
