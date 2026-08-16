$outFile = "resource-log-$(Get-Date -Format 'yyyyMMdd-HHmmss').csv"
"Timestamp,CPU(%),MemoryMB" | Out-File $outFile

while ($true) {
    $proc = Get-Process node -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($proc) {
        $counter = Get-CimInstance Win32_PerfFormattedData_PerfProc_Process |
                   Where-Object { $_.IDProcess -eq $proc.Id }

        $cpu = if ($counter) { $counter.PercentProcessorTime } else { $null }
        $memMB = [math]::Round($proc.WorkingSet64 / 1MB, 2)
        $ts = Get-Date -Format "HH:mm:ss"

        "$ts,$cpu,$memMB" | Out-File $outFile -Append
        Write-Host "$ts - PID:$($proc.Id) - CPU: $cpu% - Mem: ${memMB}MB"
    }
    Start-Sleep -Seconds 2
}

# CPU = 10% nghĩa là "trong khoảng ~1 giây vừa lấy mẫu, node.exe chiếm dụng khoảng 10% thời gian của 1 lõi CPU để tính toán".