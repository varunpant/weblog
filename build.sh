#!/bin/bash

echo -e "\033[0;32mBuilding site...\033[0m"

# Build the project with Hugo
hugo --minify

# Check if build was successful
if [ $? -eq 0 ]; then
    echo -e "\033[0;32mBuild completed successfully!\033[0m"
    echo -e "\033[0;33mGenerated files are in the 'docs' directory.\033[0m"
else
    echo -e "\033[0;31mBuild failed!\033[0m"
    exit 1
fi
