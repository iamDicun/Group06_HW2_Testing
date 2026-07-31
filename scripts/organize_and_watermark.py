import os
import re
import shutil
from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

REPORT_MD = os.path.join(PROJECT_ROOT, "submission", "reports", "HW03-GUI-Checklist-Report.md")
REPORTS_DIR = os.path.join(PROJECT_ROOT, "submission", "reports")
IMAGES_DIR = os.path.join(REPORTS_DIR, "images")

os.makedirs(IMAGES_DIR, exist_ok=True)

# 1. Map root images to destination names in images/ directory
move_mapping = {
    "image.png": "image-ff.png",
    "image-3.png": "image-ff-3.png",
    "image-4.png": "image-ff-4.png",
    "image-5.png": "image-ff-5.png",
    "image-6.png": "image-ff-6.png",
    "image-8.png": "image-ff-8.png",
    "image-9.png": "image-ff-9.png",
    "image-10.png": "image-10.png",
    "image-11.png": "image-11.png",
    "image-12.png": "image-12.png",
    "image-13.png": "image-13.png",
    "image-14.png": "image-14.png",
    "image-15.png": "image-15.png",
    "image-16.png": "image-16.png",
    "image-18.png": "image-18.png",
    "image-19.png": "image-19.png",
    "image-20.png": "image-20.png",
    "image-21.png": "image-21.png",
    "image-22.png": "image-22.png",
    "image-23.png": "image-23.png",
    "image-24.png": "image-24.png",
    "image-25.png": "image-25.png",
}

orphan_files = ["image-1.png", "image-2.png", "image-7.png", "image-17.png"]

def step1_organize_images():
    print("=== Step 1: Moving active images & deleting orphan images ===")
    for src_name, dst_name in move_mapping.items():
        src_path = os.path.join(REPORTS_DIR, src_name)
        dst_path = os.path.join(IMAGES_DIR, dst_name)
        if os.path.exists(src_path):
            print(f"Moving: {src_name} -> images/{dst_name}")
            shutil.move(src_path, dst_path)

    for orphan in orphan_files:
        orphan_path = os.path.join(REPORTS_DIR, orphan)
        if os.path.exists(orphan_path):
            print(f"Deleting orphan file: {orphan}")
            os.remove(orphan_path)

def step2_update_markdown_links():
    print("\n=== Step 2: Updating Markdown Image Links ===")
    if not os.path.exists(REPORT_MD):
        print(f"File not found: {REPORT_MD}")
        return

    with open(REPORT_MD, "r", encoding="utf-8") as f:
        content = f.read()

    pattern = r'(!\[.*?\]\()(?!images/)([^)]+)(\))'

    def replacer(m):
        prefix = m.group(1)
        fname = m.group(2).strip()
        suffix = m.group(3)
        target = move_mapping.get(fname, fname)
        return f"{prefix}images/{target}{suffix}"

    updated_content = re.sub(pattern, replacer, content)

    with open(REPORT_MD, "w", encoding="utf-8") as f:
        f.write(updated_content)

    print("Markdown links updated successfully.")

def step3_add_watermark_to_images():
    print("\n=== Step 3: Adding Prominent Bold Watermark to All Images ===")
    WATERMARK_TEXT = "nakhoa231@clc.fitus.edu.vn"
    font_candidates = ["arialbd.ttf", "arial.ttf", "calibrib.ttf", "calibri.ttf", "tahomabd.ttf", "DejaVuSans-Bold.ttf"]

    image_files = sorted([
        os.path.join(IMAGES_DIR, f)
        for f in os.listdir(IMAGES_DIR)
        if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp"))
    ])

    for img_path in image_files:
        try:
            with Image.open(img_path) as img:
                img = img.convert("RGBA")
                width, height = img.size

                # Prominent font size with minimum 22px so small Task 1 images are clearly visible
                font_size = max(22, int(height * 0.045))

                font = None
                for font_name in font_candidates:
                    try:
                        font = ImageFont.truetype(font_name, font_size)
                        break
                    except Exception:
                        continue
                if font is None:
                    font = ImageFont.load_default()

                draw = ImageDraw.Draw(img)

                margin_x = 12
                margin_y = 12

                bbox = draw.textbbox((0, 0), WATERMARK_TEXT, font=font)
                text_w = bbox[2] - bbox[0]
                text_h = bbox[3] - bbox[1]

                x = margin_x
                y = height - text_h - margin_y - 8

                # Strong stroke outline
                stroke_w = max(3, int(font_size * 0.1))

                # Draw yellow text with bold black stroke outline at bottom-left
                draw.text(
                    (x, y),
                    WATERMARK_TEXT,
                    fill=(255, 255, 0, 255),       # Bright Yellow text
                    font=font,
                    stroke_width=stroke_w,
                    stroke_fill=(0, 0, 0, 255)     # Solid Black border
                )

                # Convert RGBA to RGB background before saving
                background = Image.new("RGB", img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])
                background.save(img_path)
                print(f"Watermarked ({width}x{height}, font_size={font_size}): {os.path.basename(img_path)}")
        except Exception as e:
            print(f"Error processing {os.path.basename(img_path)}: {e}")

if __name__ == "__main__":
    step1_organize_images()
    step2_update_markdown_links()
    step3_add_watermark_to_images()
    print("\nAll tasks completed successfully!")
