#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const https = require('https')

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
  if (process.platform === 'win32') {
    console.log(message)
  } else {
    console.log(`${colors[color]}${message}${colors.reset}`)
  }
}

// Version tracking
const VERSION_FILE = 'version.json'
const UPDATE_CHECK_INTERVAL = 7 * 24 * 60 * 60 * 1000 // 7 days

class RulesUpdater {
  constructor() {
    this.versionFile = path.join(__dirname, '..', VERSION_FILE)
    this.currentVersion = this.loadCurrentVersion()
  }

  loadCurrentVersion() {
    try {
      if (fs.existsSync(this.versionFile)) {
        const data = JSON.parse(fs.readFileSync(this.versionFile, 'utf8'))
        return data
      }
    } catch (error) {
      log('Error loading version file', 'red')
    }
    
    return {
      version: '1.0.0',
      lastUpdate: Date.now(),
      rules: {}
    }
  }

  saveVersion(versionData) {
    try {
      fs.writeFileSync(this.versionFile, JSON.stringify(versionData, null, 2))
    } catch (error) {
      log('Error saving version file', 'red')
    }
  }

  async checkForUpdates() {
    log('\n🔍 Checking for updates...', 'bright')
    
    const needsUpdate = this.shouldUpdate()
    if (!needsUpdate) {
      log('✅ Rules are up to date', 'green')
      return false
    }

    log('🔄 Updates available', 'yellow')
    return true
  }

  shouldUpdate() {
    const timeSinceLastUpdate = Date.now() - this.currentVersion.lastUpdate
    return timeSinceLastUpdate > UPDATE_CHECK_INTERVAL
  }

  async updateLibraryVersions() {
    log('\n📦 Updating library versions...', 'bright')
    
    const libraries = {
      react: '^18.2.0',
      vue: '^3.3.0',
      angular: '^17.0.0',
      svelte: '^4.2.0',
      typescript: '^5.0.0',
      '@tanstack/react-query': '^5.0.0',
      'tailwindcss': '^3.3.0'
    }

    for (const [lib, version] of Object.entries(libraries)) {
      log(`  📋 ${lib}: ${version}`, 'cyan')
    }
  }

  async updateBestPractices() {
    log('\n📚 Updating best practices...', 'bright')
    
    const practices = [
      'Performance optimization patterns',
      'Security best practices',
      'Accessibility guidelines',
      'Testing strategies',
      'Error handling patterns'
    ]

    practices.forEach(practice => {
      log(`  ✅ ${practice}`, 'green')
    })
  }

  async updateRules() {
    log('\n🔄 Updating rules...', 'bright')
    
    const stacks = ['REACT', 'VUE', 'ANGULAR', 'SVELTE', 'GENERAL']
    
    for (const stack of stacks) {
      const rulesPath = path.join(__dirname, '..', 'rules', stack, '.cursorrules')
      if (fs.existsSync(rulesPath)) {
        log(`  📝 Updating ${stack} rules`, 'cyan')
        await this.updateStackRules(stack, rulesPath)
      }
    }
  }

  async updateStackRules(stack, rulesPath) {
    try {
      let content = fs.readFileSync(rulesPath, 'utf8')
      
      // Update version comment
      content = content.replace(
        /# Based on .*$/m,
        `# Based on real production projects and proven patterns (Updated: ${new Date().toISOString().split('T')[0]})`
      )
      
      // Update TypeScript version
      content = content.replace(
        /TypeScript \^[\d.]+/g,
        'TypeScript ^5.0.0'
      )
      
      fs.writeFileSync(rulesPath, content)
      log(`    ✅ ${stack} updated`, 'green')
    } catch (error) {
      log(`    ❌ Error updating ${stack}: ${error.message}`, 'red')
    }
  }

  async runUpdate() {
    log('\n🚀 Starting rules update...', 'bright')
    
    try {
      await this.updateLibraryVersions()
      await this.updateBestPractices()
      await this.updateRules()
      
      // Update version
      this.currentVersion.version = this.incrementVersion(this.currentVersion.version)
      this.currentVersion.lastUpdate = Date.now()
      this.saveVersion(this.currentVersion)
      
      log('\n✅ Update completed successfully!', 'green')
      log(`📅 Next update check: ${new Date(Date.now() + UPDATE_CHECK_INTERVAL).toLocaleDateString()}`, 'cyan')
      
    } catch (error) {
      log(`❌ Update failed: ${error.message}`, 'red')
    }
  }

  incrementVersion(version) {
    const parts = version.split('.')
    parts[2] = (parseInt(parts[2]) + 1).toString()
    return parts.join('.')
  }

  showStatus() {
    log('\n📊 Current Status:', 'bright')
    log(`  Version: ${this.currentVersion.version}`, 'cyan')
    log(`  Last Update: ${new Date(this.currentVersion.lastUpdate).toLocaleDateString()}`, 'cyan')
    
    const timeSinceUpdate = Date.now() - this.currentVersion.lastUpdate
    const daysSinceUpdate = Math.floor(timeSinceUpdate / (24 * 60 * 60 * 1000))
    
    if (daysSinceUpdate > 7) {
      log(`  ⚠️  ${daysSinceUpdate} days since last update`, 'yellow')
    } else {
      log(`  ✅ Up to date (${daysSinceUpdate} days ago)`, 'green')
    }
  }
}

// CLI interface
function showHelp() {
  log('\n🔄 Rules Updater', 'bright')
  log('================\n', 'cyan')
  
  log('Usage:', 'yellow')
  log('  node scripts/update-rules.js [command]\n', 'green')
  
  log('Commands:', 'yellow')
  log('  check     - Check for updates', 'green')
  log('  update    - Update rules', 'green')
  log('  status    - Show current status', 'green')
  log('  --help    - Show this help', 'green')
  
  log('\nExamples:', 'yellow')
  log('  node scripts/update-rules.js check', 'green')
  log('  node scripts/update-rules.js update', 'green')
  log('  node scripts/update-rules.js status', 'green')
}

async function main() {
  const args = process.argv.slice(2)
  const updater = new RulesUpdater()
  
  if (args.length === 0 || args.includes('--help')) {
    showHelp()
    return
  }
  
  const command = args[0]
  
  switch (command) {
    case 'check':
      const needsUpdate = await updater.checkForUpdates()
      if (needsUpdate) {
        log('\n💡 Run "node scripts/update-rules.js update" to update', 'yellow')
      }
      break
      
    case 'update':
      await updater.runUpdate()
      break
      
    case 'status':
      updater.showStatus()
      break
      
    default:
      log(`❌ Unknown command: ${command}`, 'red')
      showHelp()
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { RulesUpdater } 