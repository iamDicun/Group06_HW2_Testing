param (
    [string]$BugID = "TEST"
)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$evidenceDir = Join-Path $PSScriptRoot "..\bug-report\evidence"
if (-not (Test-Path $evidenceDir)) {
    New-Item -ItemType Directory -Path $evidenceDir -Force | Out-Null
}

# Tên file ảnh theo mã lỗi
$filename = "$BugID-screenshot.png"
$outputPath = Join-Path $evidenceDir $filename

Write-Host "Chờ 2 giây để bạn chuyển sang cửa sổ trình duyệt..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Lấy kích thước toàn màn hình
$screen = [System.Windows.Forms.Screen]::PrimaryScreen
$bounds = $screen.Bounds

# Chụp màn hình thật
$bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, $bounds.Size)

# Lưu file ảnh
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Giải phóng tài nguyên
$graphics.Dispose()
$bitmap.Dispose()

Write-Host "Đã chụp màn hình thực tế và lưu tại: $outputPath" -ForegroundColor Green
