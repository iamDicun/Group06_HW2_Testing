Add-Type -AssemblyName System.Drawing

$evidenceDir = Join-Path $PSScriptRoot "..\bug-report\evidence"

# Tìm kiếm đệ quy tất cả các file ảnh PNG trong các thư mục con (chrome, firefox, safari)
$images = Get-ChildItem -Path $evidenceDir -Filter "*.png" -Recurse

if ($images.Count -eq 0) {
    Write-Host "Không tìm thấy ảnh PNG nào trong thư mục evidence để chèn watermark." -ForegroundColor Yellow
    exit 0
}

# Thông tin watermark cần chèn
$watermarkText = "bddcuong23@clc.fitus.edu.vn"

Write-Host "Bắt đầu chèn watermark vào $($images.Count) hình ảnh..." -ForegroundColor Green

foreach ($imgFile in $images) {
    $filePath = $imgFile.FullName
    Write-Host "Đang xử lý chèn watermark (Góc dưới bên trái): $($imgFile.Name)..." -ForegroundColor Cyan
    
    # 1. Load ảnh vào bộ nhớ
    $image = [System.Drawing.Image]::FromFile($filePath)
    $bitmap = New-Object System.Drawing.Bitmap $image.Width, $image.Height
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Vẽ lại ảnh gốc lên canvas mới
    $graphics.DrawImage($image, 0, 0, $image.Width, $image.Height)
    
    # 2. Cấu hình Font và Brush cho watermark
    # Tự động điều chỉnh kích thước chữ theo chiều rộng ảnh (khoảng 2.5% chiều rộng ảnh)
    $fontSize = [math]::Max(14, [int]($image.Width * 0.025))
    $font = New-Object System.Drawing.Font("Arial", $fontSize, [System.Drawing.FontStyle]::Bold)
    
    # Màu chữ: Trắng bán trong suốt (Alpha = 180)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 255, 255, 255))
    # Màu bóng đổ: Đen bán trong suốt (Alpha = 120) để chữ nổi bật trên nền sáng/tối
    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120, 0, 0, 0))
    
    # 3. Tính toán vị trí góc dưới BÊN TRÁI (cách viền 20px)
    $textSize = $graphics.MeasureString($watermarkText, $font)
    $posX = 20
    $posY = $image.Height - $textSize.Height - 20
    
    # 4. Vẽ bóng đổ trước, sau đó đè chữ trắng lên
    $graphics.DrawString($watermarkText, $font, $shadowBrush, ($posX + 2), ($posY + 2))
    $graphics.DrawString($watermarkText, $font, $brush, $posX, $posY)
    
    # Giải phóng file ảnh gốc để có thể ghi đè
    $image.Dispose()
    
    # 5. Lưu đè lên file cũ
    $bitmap.Save($filePath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Giải phóng bộ nhớ canvas
    $graphics.Dispose()
    $bitmap.Dispose()
}

Write-Host "Hoàn tất chèn watermark vào góc dưới bên trái thành công!" -ForegroundColor Green
