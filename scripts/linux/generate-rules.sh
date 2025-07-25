#!/bin/bash

# Frontend Cursor Rules Generator for Linux/macOS
# Usage: ./generate-rules.sh <stack> [options]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Available stacks
declare -A STACKS
STACKS[react]="React & Next.js|rules/REACT/.cursorrules|React, Next.js, TypeScript, Zustand"
STACKS[vue]="Vue & Nuxt.js|rules/VUE/.cursorrules|Vue 3, Nuxt.js, Composition API, Pinia"
STACKS[angular]="Angular|rules/ANGULAR/.cursorrules|Angular, TypeScript, NgRx, RxJS"
STACKS[general]="General Architecture|rules/GENERAL/.cursorrules|Clean Code, SOLID, TypeScript, Security"

# Parse command line arguments
STACK=""
OUTPUT_DIR="."
GENERATE_ALL=false
SHOW_HELP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --all)
            GENERATE_ALL=true
            shift
            ;;
        --help|-h)
            SHOW_HELP=true
            shift
            ;;
        --output=*)
            OUTPUT_DIR="${1#*=}"
            shift
            ;;
        react|vue|angular|general)
            STACK="$1"
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Function to print colored output
print_color() {
    local message="$1"
    local color="$2"
    echo -e "${color}${message}${NC}"
}

# Function to show help
show_help() {
    print_color "\n🚀 Frontend Cursor Rules Generator" "$CYAN"
    print_color "=====================================\n" "$CYAN"
    
    print_color "Usage:" "$YELLOW"
    print_color "  ./generate-rules.sh <stack> [options]\n" "$GREEN"
    
    print_color "Available stacks:" "$YELLOW"
    for key in "${!STACKS[@]}"; do
        IFS='|' read -r name file desc <<< "${STACKS[$key]}"
        printf "  %-10s - %s\n" "$key" "$name"
        printf "              %s\n" "$desc"
    done
    
    print_color "\nOptions:" "$YELLOW"
    print_color "  --all        Generate rules for all stacks" "$GREEN"
    print_color "  --help       Show this help message" "$GREEN"
    print_color "  --output     Specify output directory (default: current)" "$GREEN"
    
    print_color "\nExamples:" "$YELLOW"
    print_color "  ./generate-rules.sh react" "$GREEN"
    print_color "  ./generate-rules.sh vue --output=./my-project" "$GREEN"
    print_color "  ./generate-rules.sh --all" "$GREEN"
}

# Function to copy rules
copy_rules() {
    local source_file="$1"
    local target_dir="$2"
    
    # Get the directory where this script is located
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local source_path="$script_dir/../../$source_file"
    
    if [[ ! -f "$source_path" ]]; then
        print_color "❌ Source file not found: $source_file" "$RED"
        return 1
    fi
    
    # Create target directory if it doesn't exist
    mkdir -p "$target_dir"
    
    # Copy the file
    cp "$source_path" "$target_dir/.cursorrules"
    print_color "✅ Generated .cursorrules in $target_dir/.cursorrules" "$GREEN"
    return 0
}

# Function to generate rules for a specific stack
generate_rules() {
    local stack="$1"
    local output_dir="$2"
    
    if [[ ! ${STACKS[$stack]+_} ]]; then
        print_color "❌ Unknown stack: $stack" "$RED"
        print_color "Use --help to see available options" "$YELLOW"
        return 1
    fi
    
    IFS='|' read -r name file desc <<< "${STACKS[$stack]}"
    print_color "\n🎯 Generating rules for $name..." "$CYAN"
    print_color "📁 Output: $(realpath "$output_dir")" "$CYAN"
    
    copy_rules "$file" "$output_dir"
}

# Function to generate all rules
generate_all_rules() {
    local output_dir="$1"
    
    print_color "\n🚀 Generating rules for all stacks..." "$CYAN"
    
    local success_count=0
    local total_stacks=${#STACKS[@]}
    
    for key in "${!STACKS[@]}"; do
        IFS='|' read -r name file desc <<< "${STACKS[$key]}"
        print_color "\n📦 $name..." "$YELLOW"
        if copy_rules "$file" "$output_dir"; then
            ((success_count++))
        fi
    done
    
    print_color "\n✅ Generated $success_count/$total_stacks rule sets" "$GREEN"
    return $((success_count == total_stacks ? 0 : 1))
}

# Main execution
if [[ "$SHOW_HELP" == true ]] || [[ -z "$STACK" && "$GENERATE_ALL" == false ]]; then
    show_help
    exit 0
fi

if [[ "$GENERATE_ALL" == true ]]; then
    generate_all_rules "$OUTPUT_DIR"
else
    generate_rules "$STACK" "$OUTPUT_DIR"
fi 