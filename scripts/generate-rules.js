#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Available stacks
const STACKS = {
  react: {
    name: 'React & Next.js',
    file: 'rules/REACT/.cursorrules',
    description: 'React, Next.js, TypeScript, Zustand'
  },
  vue: {
    name: 'Vue & Nuxt.js',
    file: 'rules/VUE/.cursorrules',
    description: 'Vue 3, Nuxt.js, Composition API, Pinia'
  },
  angular: {
    name: 'Angular',
    file: 'rules/ANGULAR/.cursorrules',
    description: 'Angular, TypeScript, NgRx, RxJS'
  },
  svelte: {
    name: 'Svelte & SvelteKit',
    file: 'rules/SVELTE/.cursorrules',
    description: 'Svelte, SvelteKit, TypeScript, Stores'
  },
  general: {
    name: 'General Architecture',
    file: 'rules/GENERAL/.cursorrules',
    description: 'Clean Code, SOLID, TypeScript, Security'
  }
}

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  // Disable colors on Windows for better compatibility
  if (process.platform === 'win32') {
    console.log(message)
  } else {
    console.log(`${colors[color]}${message}${colors.reset}`)
  }
}

function showHelp() {
  log('\n🚀 Frontend Cursor Rules Generator', 'bright')
  log('=====================================\n', 'cyan')
  
  log('Usage:', 'yellow')
  log('  node generate-rules.js <stack> [options]\n', 'green')
  
  log('Available stacks:', 'yellow')
  Object.entries(STACKS).forEach(([key, stack]) => {
    log(`  ${key.padEnd(10)} - ${stack.name}`, 'green')
    log(`              ${stack.description}`, 'cyan')
  })
  
  log('\nOptions:', 'yellow')
  log('  --all        Generate rules for all stacks', 'green')
  log('  --help       Show this help message', 'green')
  log('  --output     Specify output directory (default: .cursorrules)', 'green')
  
  log('\nExamples:', 'yellow')
  log('  node generate-rules.js react', 'green')
  log('  node generate-rules.js vue --output ./my-project', 'green')
  log('  node generate-rules.js --all', 'green')
}

function copyRules(sourceFile, targetDir) {
  try {
    const sourcePath = path.join(__dirname, '..', sourceFile)
    const targetPath = path.join(targetDir, '.cursorrules')
    
    if (!fs.existsSync(sourcePath)) {
      log(`❌ Source file not found: ${sourceFile}`, 'red')
      return false
    }
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    
    // Copy the main rules file
    fs.copyFileSync(sourcePath, targetPath)
    log(`✅ Generated .cursorrules in ${targetPath}`, 'green')
    
    // Copy prompt engineering guide if it exists
    const promptEngineeringPath = path.join(__dirname, '..', 'rules/GENERAL/prompt-engineering.md')
    if (fs.existsSync(promptEngineeringPath)) {
      const promptTargetPath = path.join(targetDir, 'prompt-engineering.md')
      fs.copyFileSync(promptEngineeringPath, promptTargetPath)
      log(`📚 Copied prompt-engineering.md to ${promptTargetPath}`, 'cyan')
    }
    
    // Clean up test directories after generation (Windows compatible)
    const testDirs = ['test-output', 'output', 'tmp', 'temp']
    testDirs.forEach(dir => {
      const testDirPath = path.join(targetDir, dir)
      if (fs.existsSync(testDirPath)) {
        try {
          fs.rmSync(testDirPath, { recursive: true, force: true })
          log(`🧹 Cleaned up ${dir} directory`, 'yellow')
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    })
    
    return true
  } catch (error) {
    log(`❌ Error copying rules: ${error.message}`, 'red')
    return false
  }
}

function generateRules(stack, outputDir = '.') {
  if (!STACKS[stack]) {
    log(`❌ Unknown stack: ${stack}`, 'red')
    log('Use --help to see available options', 'yellow')
    return false
  }
  
  const stackInfo = STACKS[stack]
  log(`\n🎯 Generating rules for ${stackInfo.name}...`, 'bright')
  log(`📁 Output: ${path.resolve(outputDir)}`, 'cyan')
  
  return copyRules(stackInfo.file, outputDir)
}

function generateAllRules(outputDir = '.') {
  log('\n🚀 Generating rules for all stacks...', 'bright')
  
  let successCount = 0
  const totalStacks = Object.keys(STACKS).length
  
  Object.entries(STACKS).forEach(([key, stack]) => {
    log(`\n📦 ${stack.name}...`, 'yellow')
    const success = copyRules(stack.file, outputDir)
    if (success) successCount++
  })
  
  log(`\n✅ Generated ${successCount}/${totalStacks} rule sets`, 'green')
  return successCount === totalStacks
}

// Main execution
function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args.includes('--help')) {
    showHelp()
    return
  }
  
  const stack = args[0]
  const outputDir = args.find(arg => arg.startsWith('--output='))?.split('=')[1] || '.'
  
  if (stack === '--all') {
    generateAllRules(outputDir)
  } else {
    generateRules(stack, outputDir)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { generateRules, generateAllRules, STACKS } 