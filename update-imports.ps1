$ErrorActionPreference = "Stop"

# Get all TypeScript files in the components directory
$files = Get-ChildItem -Path components -Recurse -Include *.ts, *.tsx

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace @/components/ui with ../ui (for tracking) or ./ui (for orders)
    $content = $content -replace '@/components/ui/', '../ui/'
    $content = $content -replace '@/lib/', '../../src/lib/'
    $content = $content -replace '@/hooks/', '../../hooks/'
    
    $content | Set-Content $file.FullName -NoNewline
}