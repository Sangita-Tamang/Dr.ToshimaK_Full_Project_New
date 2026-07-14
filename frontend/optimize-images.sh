#!/bin/bash

# Image Optimization Script
# This script compresses and converts images to WebP format for better performance

echo "🖼️  Image Optimization Script"
echo "=============================="

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    echo "Please install ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp not found."
    echo "Please install webp tools:"
    echo "  macOS: brew install webp"
    echo "  Ubuntu: sudo apt-get install webp"
    exit 1
fi

# Directories
INPUT_DIR="src/assets/images"
OUTPUT_DIR="src/assets/images/optimized"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

echo ""
echo "📁 Input Directory: $INPUT_DIR"
echo "📁 Output Directory: $OUTPUT_DIR"
echo ""

# Counter
count=0
total_original_size=0
total_optimized_size=0

# Process JPG and PNG files
for img in "$INPUT_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    # Skip if no files match
    [ -e "$img" ] || continue
    
    # Get filename without path and extension
    filename=$(basename "$img")
    name="${filename%.*}"
    ext="${filename##*.}"
    
    echo "🔄 Processing: $filename"
    
    # Get original size
    original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    total_original_size=$((total_original_size + original_size))
    
    # Compress JPEG/PNG
    if [[ "$ext" == "jpg" || "$ext" == "jpeg" || "$ext" == "JPG" || "$ext" == "JPEG" ]]; then
        # Optimize JPEG - quality 80, strip metadata
        convert "$img" -quality 80 -strip "$OUTPUT_DIR/${name}.jpg"
        echo "  ✓ Compressed JPEG created"
    elif [[ "$ext" == "png" || "$ext" == "PNG" ]]; then
        # Optimize PNG
        convert "$img" -quality 85 -strip "$OUTPUT_DIR/${name}.png"
        echo "  ✓ Compressed PNG created"
    fi
    
    # Convert to WebP - quality 75
    cwebp -q 75 "$img" -o "$OUTPUT_DIR/${name}.webp" 2>/dev/null
    echo "  ✓ WebP version created"
    
    # Get optimized sizes
    if [ -f "$OUTPUT_DIR/${name}.jpg" ]; then
        optimized_size=$(stat -f%z "$OUTPUT_DIR/${name}.jpg" 2>/dev/null || stat -c%s "$OUTPUT_DIR/${name}.jpg" 2>/dev/null)
    elif [ -f "$OUTPUT_DIR/${name}.png" ]; then
        optimized_size=$(stat -f%z "$OUTPUT_DIR/${name}.png" 2>/dev/null || stat -c%s "$OUTPUT_DIR/${name}.png" 2>/dev/null)
    fi
    
    total_optimized_size=$((total_optimized_size + optimized_size))
    
    # Calculate savings
    savings=$((100 - (optimized_size * 100 / original_size)))
    echo "  💾 Size: $(numfmt --to=iec $original_size) → $(numfmt --to=iec $optimized_size) (${savings}% reduction)"
    echo ""
    
    count=$((count + 1))
done

# Summary
echo "=============================="
echo "✅ Optimization Complete!"
echo ""
echo "📊 Summary:"
echo "  Files processed: $count"
echo "  Original total size: $(numfmt --to=iec $total_original_size)"
echo "  Optimized total size: $(numfmt --to=iec $total_optimized_size)"

if [ $total_original_size -gt 0 ]; then
    total_savings=$((100 - (total_optimized_size * 100 / total_original_size)))
    echo "  Total savings: ${total_savings}%"
fi

echo ""
echo "📝 Next Steps:"
echo "  1. Review optimized images in: $OUTPUT_DIR"
echo "  2. Replace original images with optimized versions"
echo "  3. Update image imports to use WebP with fallbacks"
echo ""
echo "Example usage in React:"
echo '  <picture>'
echo '    <source srcSet="image.webp" type="image/webp" />'
echo '    <img src="image.jpg" alt="Description" />'
echo '  </picture>'
echo ""
