# PowerShell script to update imports
$files = Get-ChildItem -Path "src/components/ui" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Update imports from @/lib/utils to ../../lib/utils
    $content = $content -replace 'from ([''"])@/lib/utils([''"])', 'from $1../../lib/utils$2'
    
    Set-Content $file.FullName $content
}