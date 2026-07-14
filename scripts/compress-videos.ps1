# PowerShell script to compress WebM videos using FFmpeg
# Usage: powershell -ExecutionPolicy Bypass -File scripts/compress-videos.ps1

$videoDir = Join-Path $PSScriptRoot "..\public\vid"
$tempDir = Join-Path $PSScriptRoot "..\.vid-tmp"

if (!(Test-Path $tempDir)) {
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
}

# Scan for WebM files
$videos = Get-ChildItem -Path $videoDir -Recurse -File -Filter "*.webm"
$totalBefore = 0
$totalAfter = 0

Write-Host "Starting WebM Video Compression"
Write-Host "=============================================="
Write-Host "Scanning directory: $videoDir"
Write-Host "Found $($videos.Count) videos to process.`n"

foreach ($video in $videos) {
    $beforeSize = $video.Length
    $totalBefore += $beforeSize
    $beforeMB = [math]::Round($beforeSize / 1MB, 2)
    
    $tempFile = Join-Path $tempDir $video.Name
    Write-Host "Compressing: $($video.Name) ($beforeMB MB)..."
    
    # VP9 Compression options
    $args = @(
        "-y",
        "-i", $video.FullName,
        "-c:v", "libvpx-vp9",
        "-crf", "36",
        "-b:v", "0",
        "-row-mt", "1",
        "-speed", "4",
        "-c:a", "libopus",
        "-b:a", "64k",
        $tempFile
    )
    
    & ffmpeg @args 2>$null
    
    if (Test-Path $tempFile) {
        $afterSize = (Get-Item $tempFile).Length
        $afterMB = [math]::Round($afterSize / 1MB, 2)
        
        if ($afterSize -lt $beforeSize) {
            $saving = [math]::Round((1 - ($afterSize / $beforeSize)) * 100, 1)
            Write-Host "  Success! $beforeMB MB -> $afterMB MB ($saving% reduction)"
            
            # Replace original file with compressed file
            Remove-Item $video.FullName -Force
            Move-Item $tempFile $video.FullName -Force
            $totalAfter += $afterSize
        } else {
            Write-Host "  Kept original. Output was not smaller ($afterMB MB vs $beforeMB MB)"
            Remove-Item $tempFile -Force
            $totalAfter += $beforeSize
        }
    } else {
        Write-Host "  Error: FFmpeg failed to compress $($video.Name)"
        $totalAfter += $beforeSize
    }
    Write-Host ""
}

# Cleanup
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force | Out-Null
}

$savedMB = [math]::Round(($totalBefore - $totalAfter) / 1MB, 2)
$reduction = [math]::Round((1 - ($totalAfter / $totalBefore)) * 100, 1)

Write-Host "=============================================="
Write-Host "Video Compression Summary"
Write-Host "Total before: $([math]::Round($totalBefore / 1MB, 2)) MB"
Write-Host "Total after:  $([math]::Round($totalAfter / 1MB, 2)) MB"
Write-Host "Reduction:  $reduction%"
Write-Host "Saved:      $savedMB MB"
