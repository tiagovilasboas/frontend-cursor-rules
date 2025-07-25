# Frontend Cursor Rules Generator for Windows
# Usage: .\generate-rules.ps1 <stack> [options]

param(
    [Parameter(Position=0)]
    [string]$Stack,
    
    [Parameter()]
    [string]$Output = ".",
    
    [Parameter()]
    [switch]$All,
    
    [Parameter()]
    [switch]$Help
)

# Available stacks
$Stacks = @{
    "react" = @{
        Name = "React & Next.js"
        File = "rules\REACT\.cursorrules"
        Description = "React, Next.js, TypeScript, Zustand"
    }
    "vue" = @{
        Name = "Vue & Nuxt.js"
        File = "rules\VUE\.cursorrules"
        Description = "Vue 3, Nuxt.js, Composition API, Pinia"
    }
    "angular" = @{
        Name = "Angular"
        File = "rules\ANGULAR\.cursorrules"
        Description = "Angular, TypeScript, NgRx, RxJS"
    }
    "general" = @{
        Name = "General Architecture"
        File = "rules\GENERAL\.cursorrules"
        Description = "Clean Code, SOLID, TypeScript, Security"
    }
}

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Show-Help {
    Write-ColorOutput "`n🚀 Frontend Cursor Rules Generator" "Cyan"
    Write-ColorOutput "=====================================`n" "Cyan"
    
    Write-ColorOutput "Usage:" "Yellow"
    Write-ColorOutput "  .\generate-rules.ps1 <stack> [options]`n" "Green"
    
    Write-ColorOutput "Available stacks:" "Yellow"
    foreach ($key in $Stacks.Keys) {
        $stack = $Stacks[$key]
        Write-ColorOutput "  $($key.PadRight(10)) - $($stack.Name)" "Green"
        Write-ColorOutput "              $($stack.Description)" "Cyan"
    }
    
    Write-ColorOutput "`nOptions:" "Yellow"
    Write-ColorOutput "  -All         Generate rules for all stacks" "Green"
    Write-ColorOutput "  -Help        Show this help message" "Green"
    Write-ColorOutput "  -Output      Specify output directory (default: current)" "Green"
    
    Write-ColorOutput "`nExamples:" "Yellow"
    Write-ColorOutput "  .\generate-rules.ps1 react" "Green"
    Write-ColorOutput "  .\generate-rules.ps1 vue -Output .\my-project" "Green"
    Write-ColorOutput "  .\generate-rules.ps1 -All" "Green"
}

function Copy-Rules {
    param(
        [string]$SourceFile,
        [string]$TargetDir
    )
    
    try {
        $SourcePath = Join-Path $PSScriptRoot "..\..\$SourceFile"
        $TargetPath = Join-Path $TargetDir ".cursorrules"
        
        if (-not (Test-Path $SourcePath)) {
            Write-ColorOutput "❌ Source file not found: $SourceFile" "Red"
            return $false
        }
        
        # Create target directory if it doesn't exist
        if (-not (Test-Path $TargetDir)) {
            New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
        }
        
        # Copy the file
        Copy-Item -Path $SourcePath -Destination $TargetPath -Force
        Write-ColorOutput "✅ Generated .cursorrules in $TargetPath" "Green"
        return $true
    }
    catch {
        Write-ColorOutput "❌ Error copying rules: $($_.Exception.Message)" "Red"
        return $false
    }
}

function Generate-Rules {
    param(
        [string]$Stack,
        [string]$OutputDir = "."
    )
    
    if (-not $Stacks.ContainsKey($Stack)) {
        Write-ColorOutput "❌ Unknown stack: $Stack" "Red"
        Write-ColorOutput "Use -Help to see available options" "Yellow"
        return $false
    }
    
    $StackInfo = $Stacks[$Stack]
    Write-ColorOutput "`n🎯 Generating rules for $($StackInfo.Name)..." "Cyan"
    Write-ColorOutput "📁 Output: $(Resolve-Path $OutputDir)" "Cyan"
    
    return Copy-Rules -SourceFile $StackInfo.File -TargetDir $OutputDir
}

function Generate-AllRules {
    param([string]$OutputDir = ".")
    
    Write-ColorOutput "`n🚀 Generating rules for all stacks..." "Cyan"
    
    $SuccessCount = 0
    $TotalStacks = $Stacks.Count
    
    foreach ($key in $Stacks.Keys) {
        $stack = $Stacks[$key]
        Write-ColorOutput "`n📦 $($stack.Name)..." "Yellow"
        $Success = Copy-Rules -SourceFile $stack.File -TargetDir $OutputDir
        if ($Success) { $SuccessCount++ }
    }
    
    Write-ColorOutput "`n✅ Generated $SuccessCount/$TotalStacks rule sets" "Green"
    return $SuccessCount -eq $TotalStacks
}

# Main execution
if ($Help -or -not $Stack) {
    Show-Help
    exit
}

if ($All) {
    Generate-AllRules -OutputDir $Output
} else {
    Generate-Rules -Stack $Stack -OutputDir $Output
} 