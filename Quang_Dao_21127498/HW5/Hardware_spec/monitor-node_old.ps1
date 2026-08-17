$outFile = "spike_test_resource-log-$(Get-Date -Format 'yyyyMMdd-HHmmss').csv"
"Timestamp,CPU(%),MemoryMB" | Out-File $outFile

while ($true) {
    $proc = Get-Process node -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($proc) {
        $cpu = (Get-Counter "\Process(node)\% Processor Time").CounterSamples[0].CookedValue
        $memMB = [math]::Round($proc.WorkingSet64 / 1MB, 2)
        $ts = Get-Date -Format "HH:mm:ss"
        "$ts,$cpu,$memMB" | Out-File $outFile -Append
        Write-Host "$ts - CPU: $cpu% - Mem: ${memMB}MB"
    }
    Start-Sleep -Seconds 5
}