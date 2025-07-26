# 🎯 Prompt Engineering Rules for Frontend Development
# Based on ChatGPT Complete methodology adapted for .cursorrules context

## 🧠 **C.R.E.A.T.E Formula for AI Assistant**

### **C: Character (Caráter)**
Define the AI's role and expertise level:

```markdown
# AI Assistant Role Definition
You are an experienced senior frontend developer with:
- Extensive experience in large-scale production applications
- Expertise in React, Vue, Angular, TypeScript, and modern web technologies
- Deep knowledge of performance optimization, security, and scalability
- Experience with enterprise-level applications
- Understanding of Clean Architecture and SOLID principles
```

### **R: Request (Solicitação)**
Be specific about what you need:

```markdown
# Specific Request Examples
❌ Bad: "Create a component"
✅ Good: "Create a TypeScript React component for a user profile card with loading states, error handling, and responsive design using Tailwind CSS"

❌ Bad: "Fix this code"
✅ Good: "Analyze this TypeScript code for potential memory leaks, performance issues, and security vulnerabilities, then provide a refactored version with proper error handling"
```

### **E: Examples (Exemplos)**
Provide concrete examples for better results:

```markdown
# Example-Driven Requests
"Create a custom hook following this pattern:
```typescript
const useApiData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Implementation here
}
```"
```

### **A: Adjustments (Ajustes)**
Refine and iterate:

```markdown
# Adjustment Instructions
- "Avoid using any type, use proper TypeScript interfaces"
- "Include comprehensive error handling"
- "Add JSDoc documentation for all functions"
- "Follow the repository pattern for data access"
- "Implement proper loading and error states"
```

### **T: Type of Output (Tipo de Saída)**
Specify the desired format:

```markdown
# Output Format Examples
- "Provide the code with TypeScript interfaces and JSDoc comments"
- "Show the component with loading, error, and success states"
- "Include unit tests using Jest and React Testing Library"
- "Add performance optimization suggestions"
- "Include accessibility improvements (ARIA labels, keyboard navigation)"
```

### **E: Extras (Extras)**
Add unique instructions:

```markdown
# Extra Instructions
- "Consider mobile-first responsive design"
- "Implement proper SEO meta tags"
- "Add dark mode support"
- "Include proper error boundaries"
- "Optimize for Core Web Vitals"
```

## 🎯 **AI Role Definitions for Frontend**

### **1. Senior Frontend Architect**
```markdown
Act as a senior frontend architect with extensive production experience:
- Design scalable component architectures
- Implement performance optimization strategies
- Create maintainable code patterns
- Establish coding standards and best practices
- Review and refactor legacy code
```

### **2. Performance Optimization Expert**
```markdown
Act as a performance optimization expert:
- Analyze bundle size and loading performance
- Implement code splitting strategies
- Optimize images and assets
- Monitor Core Web Vitals
- Implement caching strategies
```

### **3. Security Specialist**
```markdown
Act as a frontend security specialist:
- Identify XSS vulnerabilities
- Implement proper input validation
- Secure API integrations
- Handle sensitive data properly
- Follow OWASP guidelines
```

### **4. Accessibility Expert**
```markdown
Act as an accessibility expert:
- Implement ARIA labels and roles
- Ensure keyboard navigation
- Maintain proper color contrast
- Support screen readers
- Follow WCAG 2.1 guidelines
```

## 📋 **Output Format Specifications**

### **Code Generation**
```markdown
# Code Output Format
- Use TypeScript with strict mode
- Include proper interfaces and types
- Add comprehensive error handling
- Include loading and error states
- Follow component composition patterns
- Add JSDoc documentation
```

### **Documentation**
```markdown
# Documentation Format
- Clear README with setup instructions
- API documentation with examples
- Component usage examples
- Performance considerations
- Security notes
```

### **Testing**
```markdown
# Testing Format
- Unit tests with Jest
- Integration tests
- Accessibility tests
- Performance tests
- Error scenario coverage
```

## 🚀 **Prompt Templates for Common Tasks**

### **Component Creation**
```markdown
Create a [COMPONENT_TYPE] component with the following requirements:
- Framework: [REACT/VUE/ANGULAR]
- Props: [LIST_PROPS]
- Features: [LIST_FEATURES]
- Styling: [TAILWIND/CSS_MODULES/STYLED_COMPONENTS]
- Include: loading states, error handling, accessibility, responsive design
```

### **Hook/Composable Creation**
```markdown
Create a custom [FRAMEWORK] hook/composable for [FUNCTIONALITY]:
- Input: [DESCRIBE_INPUTS]
- Output: [DESCRIBE_OUTPUTS]
- Error handling: [SPECIFY_ERROR_HANDLING]
- Performance: [OPTIMIZATION_REQUIREMENTS]
- Include: TypeScript interfaces, JSDoc, usage examples
```

### **API Integration**
```markdown
Create a repository/service for [API_ENDPOINT]:
- HTTP client: [AXIOS/FETCH]
- Error handling: [SPECIFY_ERROR_STRATEGY]
- Caching: [CACHING_STRATEGY]
- TypeScript: [INTERFACE_DEFINITIONS]
- Include: loading states, retry logic, error boundaries
```

## 🎯 **Quality Assurance Prompts**

### **Code Review**
```markdown
Review this code for:
- TypeScript best practices
- Performance implications
- Security vulnerabilities
- Accessibility issues
- Maintainability concerns
- Testing coverage
```

### **Refactoring**
```markdown
Refactor this code to:
- Improve performance
- Enhance maintainability
- Add proper error handling
- Implement better TypeScript usage
- Follow SOLID principles
- Add comprehensive testing
```

## 🏆 **Advanced Prompt Engineering**

### **Multi-Step Development**
```markdown
1. First, analyze the requirements and create TypeScript interfaces
2. Then, implement the core functionality with proper error handling
3. Next, add loading and error states
4. Finally, include accessibility features and responsive design
5. Add comprehensive unit tests
```

### **Context-Aware Prompts**
```markdown
Given this project context:
- Framework: [FRAMEWORK]
- State management: [STATE_MANAGEMENT]
- Styling: [STYLING_APPROACH]
- Testing: [TESTING_FRAMEWORK]

Create a solution that integrates seamlessly with the existing architecture.
```

## ⚠️ **Important Guidelines**

### **Avoid Common Pitfalls**
- ❌ Don't ask for "the best" solution without context
- ❌ Don't request generic code without specific requirements
- ❌ Don't ignore error handling and edge cases
- ✅ Always specify TypeScript requirements
- ✅ Always include accessibility considerations
- ✅ Always consider performance implications

### **Iterative Improvement**
```markdown
# Improvement Cycle
1. Generate initial solution
2. Review for potential issues
3. Refine based on feedback
4. Add comprehensive testing
5. Document usage and considerations
```

---

*Based on ChatGPT Complete methodology adapted for frontend development and .cursorrules context* 