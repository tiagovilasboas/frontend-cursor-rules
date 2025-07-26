#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

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

// Project complexity levels
const COMPLEXITY_LEVELS = {
  simple: {
    name: 'Simple Project',
    description: 'Small projects, prototypes, learning',
    features: [
      'Basic TypeScript',
      'Simple component structure',
      'Basic error handling',
      'Minimal setup'
    ]
  },
  standard: {
    name: 'Standard Project',
    description: 'Medium projects, small teams',
    features: [
      'Full TypeScript',
      'Component patterns',
      'Error handling',
      'Performance basics',
      'Testing setup'
    ]
  },
  enterprise: {
    name: 'Enterprise Project',
    description: 'Large projects, teams, production',
    features: [
      'Full TypeScript strict',
      'Advanced patterns',
      'Comprehensive error handling',
      'Performance optimization',
      'Security practices',
      'Testing strategy',
      'Documentation'
    ]
  }
}

// Simplified rules templates
const SIMPLE_RULES = {
  react: `# 🎯 Simple React Rules
# For small projects and prototypes

## 📋 Basic Guidelines
- Use TypeScript for type safety
- Keep components simple and focused
- Handle basic errors
- Use modern React patterns

## 🎯 Component Structure
\`\`\`typescript
interface ComponentProps {
  title: string
  onClick?: () => void
}

export const Component: React.FC<ComponentProps> = ({
  title,
  onClick
}) => {
  return (
    <div onClick={onClick}>
      {title}
    </div>
  )
}
\`\`\`

## 📦 Basic Patterns
- Use functional components
- Keep state local when possible
- Use useEffect for side effects
- Handle loading states

## ⚠️ Error Handling
\`\`\`typescript
try {
  const data = await fetch('/api')
  return data.json()
} catch (error) {
  console.error('Error:', error)
  return null
}
\`\`\`

## 🎨 Styling
- Use CSS modules or styled-components
- Keep styles simple
- Use responsive design basics

## 📝 Code Style
- Use meaningful names
- Keep functions small
- Add basic comments
- Use consistent formatting
`,

  vue: `# 🎯 Simple Vue Rules
# For small projects and prototypes

## 📋 Basic Guidelines
- Use Composition API
- Keep components simple
- Handle basic errors
- Use TypeScript

## 🎯 Component Structure
\`\`\`vue
<script setup lang="ts">
interface Props {
  title: string
  onClick?: () => void
}

defineProps<Props>()
</script>

<template>
  <div @click="onClick">
    {{ title }}
  </div>
</template>
\`\`\`

## 📦 Basic Patterns
- Use Composition API
- Keep state local
- Use reactive refs
- Handle loading states

## ⚠️ Error Handling
\`\`\`typescript
try {
  const data = await fetch('/api')
  return data.json()
} catch (error) {
  console.error('Error:', error)
  return null
}
\`\`\`

## 🎨 Styling
- Use scoped styles
- Keep styles simple
- Use responsive design basics

## 📝 Code Style
- Use meaningful names
- Keep functions small
- Add basic comments
- Use consistent formatting
`,

  svelte: `# 🎯 Simple Svelte Rules
# For small projects and prototypes

## 📋 Basic Guidelines
- Use SvelteKit basics
- Keep components simple
- Handle basic errors
- Use TypeScript

## 🎯 Component Structure
\`\`\`svelte
<script lang="ts">
  interface Props {
    title: string
    onClick?: () => void
  }
  
  export let title: Props['title']
  export let onClick: Props['onClick']
</script>

<div on:click={onClick}>
  {title}
</div>
\`\`\`

## 📦 Basic Patterns
- Use Svelte stores for global state
- Keep components focused
- Use reactive statements
- Handle loading states

## ⚠️ Error Handling
\`\`\`typescript
try {
  const data = await fetch('/api')
  return data.json()
} catch (error) {
  console.error('Error:', error)
  return null
}
\`\`\`

## 🎨 Styling
- Use component styles
- Keep styles simple
- Use responsive design basics

## 📝 Code Style
- Use meaningful names
- Keep functions small
- Add basic comments
- Use consistent formatting
`
}

function showHelp() {
  log('\n🎯 Simple Rules Generator', 'bright')
  log('==========================\n', 'cyan')
  
  log('Usage:', 'yellow')
  log('  node scripts/generate-simple.js <stack> <complexity> [options]\n', 'green')
  
  log('Available stacks:', 'yellow')
  log('  react, vue, svelte\n', 'green')
  
  log('Complexity levels:', 'yellow')
  Object.entries(COMPLEXITY_LEVELS).forEach(([key, level]) => {
    log(`  ${key.padEnd(10)} - ${level.name}`, 'green')
    log(`              ${level.description}`, 'cyan')
  })
  
  log('\nOptions:', 'yellow')
  log('  --output     Specify output directory (default: .cursorrules)', 'green')
  log('  --help       Show this help message', 'green')
  
  log('\nExamples:', 'yellow')
  log('  node scripts/generate-simple.js react simple', 'green')
  log('  node scripts/generate-simple.js vue standard --output ./my-project', 'green')
}

function generateSimpleRules(stack, complexity, outputDir = '.') {
  if (!SIMPLE_RULES[stack]) {
    log(`❌ Unknown stack: ${stack}`, 'red')
    log('Available: react, vue, svelte', 'yellow')
    return false
  }
  
  if (!COMPLEXITY_LEVELS[complexity]) {
    log(`❌ Unknown complexity: ${complexity}`, 'red')
    log('Available: simple, standard, enterprise', 'yellow')
    return false
  }
  
  const level = COMPLEXITY_LEVELS[complexity]
  log(`\n🎯 Generating ${level.name} rules for ${stack}...`, 'bright')
  log(`📁 Output: ${path.resolve(outputDir)}`, 'cyan')
  
  try {
    // Create output directory
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    
    // Generate rules content
    let content = SIMPLE_RULES[stack]
    
    // Add complexity-specific content
    if (complexity === 'standard') {
      content += `

## 🧪 Testing (Standard)
- Add basic unit tests
- Test component rendering
- Mock external dependencies
- Aim for 60% coverage

## 🚀 Performance (Standard)
- Use React.memo for expensive components
- Implement basic code splitting
- Optimize images
- Monitor bundle size
`
    } else if (complexity === 'enterprise') {
      content += `

## 🧪 Testing (Enterprise)
- Comprehensive unit tests
- Integration tests
- E2E tests with Cypress
- Aim for 80%+ coverage
- Test error scenarios

## 🚀 Performance (Enterprise)
- Advanced code splitting
- Bundle analysis
- Core Web Vitals optimization
- Performance monitoring
- Caching strategies

## 🔒 Security (Enterprise)
- Input validation
- XSS prevention
- CSRF protection
- Security headers
- Regular security audits

## 📚 Documentation (Enterprise)
- Component documentation
- API documentation
- Architecture decisions
- Deployment guides
- Contributing guidelines
`
    }
    
    // Write rules file
    const rulesPath = path.join(outputDir, '.cursorrules')
    fs.writeFileSync(rulesPath, content)
    
    // Write complexity info
    const infoPath = path.join(outputDir, 'project-info.md')
    const infoContent = `# Project Information

## Complexity Level: ${level.name}
**Description:** ${level.description}

## Features Included:
${level.features.map(f => `- ${f}`).join('\n')}

## Generated: ${new Date().toLocaleDateString()}
`
    fs.writeFileSync(infoPath, infoContent)
    
    log(`✅ Generated .cursorrules in ${rulesPath}`, 'green')
    log(`📋 Generated project-info.md in ${infoPath}`, 'cyan')
    
    return true
  } catch (error) {
    log(`❌ Error generating rules: ${error.message}`, 'red')
    return false
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args.includes('--help')) {
    showHelp()
    return
  }
  
  const stack = args[0]
  const complexity = args[1] || 'simple'
  const outputDir = args.find(arg => arg.startsWith('--output='))?.split('=')[1] || '.'
  
  generateSimpleRules(stack, complexity, outputDir)
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = { generateSimpleRules, COMPLEXITY_LEVELS } 