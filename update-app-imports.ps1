$files = @(
    "src/app/labels/page.tsx",
    "src/app/job-allotment/page.tsx",
    "src/app/inventory/page.tsx", 
    "src/app/finance/page.tsx",
    "src/app/dashboard/page.tsx",
    "src/app/customers/page.tsx",
    "src/app/costing/page.tsx",
    "src/app/ai-chat/page.tsx",
    "src/app/orders/page.tsx",
    "src/app/order-dispatch/page.tsx",
    "src/app/material-log/page.tsx",
    "src/app/master-admin/page.tsx",
    "src/app/master-admin/layout.tsx",
    "src/app/login/page.tsx"
)

foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    $content = Get-Content $fullPath -Raw
    
    # Update paths based on the relative depth
    $dots = "../../../"
    
    $content = $content -replace '@/components/', "$dots`components/"
    $content = $content -replace '@/hooks/', "$dots`hooks/"
    $content = $content -replace '@/lib/', "$dots`lib/"
    $content = $content -replace '@/app/', "$dots`app/"
    
    Set-Content $fullPath $content
}