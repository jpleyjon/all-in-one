#!/bin/bash

# Docker development scripts for all-in-one data structures library

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Build Docker image
build() {
    print_status "Building Docker image..."
    docker build -t all-in-one:latest .
    print_success "Docker image built successfully!"
}

# Run tests in Docker
test() {
    print_status "Running tests in Docker..."
    docker run --rm all-in-one:latest
    print_success "All tests passed in Docker!"
}

# Run tests with Docker Compose
test_compose() {
    print_status "Running tests with Docker Compose..."
    docker-compose up --build --abort-on-container-exit test
    docker-compose down
    print_success "Docker Compose tests completed!"
}

# Run multi-node tests
test_multi() {
    print_status "Running tests on multiple Node.js versions..."
    
    for version in 18 20 22; do
        print_status "Testing with Node.js $version..."
        docker run --rm \
            -v "$(pwd):/app" \
            -w /app \
            node:${version}-alpine \
            sh -c "npm ci && npx tsc && npm test"
        print_success "Node.js $version tests completed!"
    done
}

# Development mode with file watching
dev() {
    print_status "Starting development mode with Docker..."
    docker-compose up --build dev
}

# Clean up Docker resources
clean() {
    print_status "Cleaning up Docker resources..."
    
    # Remove containers
    docker-compose down --volumes --remove-orphans 2>/dev/null || true
    
    # Remove images
    docker rmi all-in-one:latest 2>/dev/null || true
    
    # Remove unused volumes
    docker volume prune -f
    
    print_success "Docker cleanup completed!"
}

# Interactive shell in container
shell() {
    print_status "Starting interactive shell in Docker container..."
    docker run --rm -it \
        -v "$(pwd):/app" \
        -w /app \
        node:20-alpine \
        sh
}

# Show help
help() {
    echo "Docker utility scripts for all-in-one data structures library"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  build       Build Docker image"
    echo "  test        Run tests in Docker"
    echo "  test-compose Run tests with Docker Compose"
    echo "  test-multi  Run tests on multiple Node.js versions"
    echo "  dev         Start development mode with file watching"
    echo "  shell       Start interactive shell in container"
    echo "  clean       Clean up Docker resources"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build"
    echo "  $0 test"
    echo "  $0 clean"
}

# Main script logic
case "${1:-help}" in
    build)
        build
        ;;
    test)
        test
        ;;
    test-compose)
        test_compose
        ;;
    test-multi)
        test_multi
        ;;
    dev)
        dev
        ;;
    shell)
        shell
        ;;
    clean)
        clean
        ;;
    help|*)
        help
        ;;
esac
