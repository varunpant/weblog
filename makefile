.PHONY: build clean serve help

# Build the site
build:
	@echo "Building site with Hugo..."
	@hugo --minify

# Clean the generated files
clean:
	@echo "Cleaning generated files..."
	@rm -rf docs/
	@echo "Clean complete!"

# Serve the site locally for development
serve:
	@echo "Starting Hugo development server..."
	@hugo server -D

# Build and watch for changes
watch:
	@echo "Building and watching for changes..."
	@hugo --minify --watch

# Show help
help:
	@echo "Available targets:"
	@echo "  build   - Build the site (generates files in docs/)"
	@echo "  clean   - Remove generated files"
	@echo "  serve   - Start local development server"
	@echo "  watch   - Build and watch for changes"
	@echo "  help    - Show this help message"
