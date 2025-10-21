# PowerShell script to update imports
$files = Get-ChildItem -Path "src" -Recurse -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Update imports to use @/ alias for paths that include src
    $content = $content -replace 'from ([''"])\.\.\/\.\.\/src\/lib', 'from $1@/lib'
    $content = $content -replace 'from ([''"])\.\.\/\.\.\/src\/components', 'from $1@/components'
    
    Set-Content $file.FullName $content
}