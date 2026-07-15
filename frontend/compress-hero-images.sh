#!/bin/bash

# Hero Image Compression Script
# Compresses hero images from 1.5-1.8MB to under 200KB each

echo "🖼️  Compressing Hero Images"
echo "=============================="

cd "$(dirname "$0")/src/assets/images"

# Process each hero image
for img in *.hero.png; do
    [ -e "$img" ] || continue
    
    filename=$(basename "$img")
    name="${filename%.*}"
    
    echo ""
    echo "🔄 Processing: $filename"
    
    # Get original size
    if [[ "$OSTYPE" == "darwin"* ]]; then
        original_size=$(stat -f%z "$img")
    else
        original_size=$(stat -c%s "$img")
    fi
    
    original_mb=$(echo "scale=2; $original_size/1024/1024" | bc)
    echo "  📦 Original size: ${original_mb}MB"
    
    # Create backup
    cp "$img" "${img}.backup"
    
    # Method 1: Try with sips (macOS native)
    if command -v sips &> /dev/null; then
        echo "  🔧 Using sips for compression..."
        sips -s format jpeg -s formatOptions 75 "$img" --out "${name}.jpg" > /dev/null 2>&1
        
        if [ -f "${name}.jpg" ]; then
            mv "${name}.jpg" "$img"
            
            if [[ "$OSTYPE" == "darwin"* ]]; then
                new_size=$(stat -f%z "$img")
            else
                new_size=$(stat -c%s "$img")
            fi
            
            new_kb=$(echo "scale=2; $new_size/1024" | bc)
            savings=$(echo "scale=1; 100 - ($new_size * 100 / $original_size)" | bc)
            
            echo "  ✅ Compressed: ${new_kb}KB (${savings}% reduction)"
        fi
    # Method 2: Try with ImageMagick
    elif command -v convert &> /dev/null; then
        echo "  🔧 Using ImageMagick for compression..."
        convert "$img" -quality 70 -resize 1920x1080 -strip "${name}.jpg"
        mv "${name}.jpg" "$img"
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            new_size=$(stat -f%z "$img")
        else
            new_size=$(stat -c%s "$img")
        fi
        
        new_kb=$(echo "scale=2; $new_size/1024" | bc)
        savings=$(echo "scale=1; 100 - ($new_size * 100 / $original_size)" | bc)
        
        echo "  ✅ Compressed: ${new_kb}KB (${savings}% reduction)"
    else
        echo "  ⚠️  No compression tool available (install ImageMagick: brew install imagemagick)"
        rm "${img}.backup"
    fi
done

echo ""
echo "=============================="
echo "✅ Hero Image Compression Complete!"
echo ""
echo "📝 Backups saved with .backup extension"
echo "📝 If images look good, delete .backup files"
echo ""
