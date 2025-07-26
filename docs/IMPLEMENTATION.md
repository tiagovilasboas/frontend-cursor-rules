# 🔧 Exemplos Práticos de Implementação

## 📋 Visão Geral

Exemplos concretos de como implementar as práticas baseadas em cases reais.

## 🎯 Netflix - Bundle Size +60%

### **Problema Original**
```typescript
// ❌ Bundle size excessivo
import { ExpensiveComponent } from './ExpensiveComponent'
import { AnotherExpensiveComponent } from './AnotherExpensiveComponent'
import { YetAnotherComponent } from './YetAnotherComponent'

export const App = () => {
  return (
    <div>
      <ExpensiveComponent />
      <AnotherExpensiveComponent />
      <YetAnotherComponent />
    </div>
  )
}
```

### **Solução Implementada**
```typescript
// ✅ Code splitting + lazy loading
const ExpensiveComponent = lazy(() => import('./ExpensiveComponent'))
const AnotherExpensiveComponent = lazy(() => import('./AnotherExpensiveComponent'))
const YetAnotherComponent = lazy(() => import('./YetAnotherComponent'))

export const App = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <ExpensiveComponent />
        <AnotherExpensiveComponent />
        <YetAnotherComponent />
      </Suspense>
    </div>
  )
}

// ✅ React.memo para componentes caros
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Component logic */}</div>
})

// ✅ Tree shaking otimizado
export { ExpensiveComponent } from './ExpensiveComponent'
// Não exporte componentes não utilizados
```

## 🎯 Airbnb - Code Reviews 4-6h

### **Problema Original**
```typescript
// ❌ Código inconsistente
const UserCard = ({ user, onEdit }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
}
```

### **Solução Implementada**
```typescript
// ✅ TypeScript strict + interfaces explícitas
interface User {
  id: string
  name: string
  email: string
}

interface UserCardProps {
  user: User
  onEdit: (id: string) => void
  loading?: boolean
}

// ✅ Presentational component (UI only)
export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  loading = false 
}) => {
  if (loading) return <Skeleton />
  
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button 
        onClick={() => onEdit(user.id)}
        className="edit-button"
      >
        Edit
      </button>
    </div>
  )
}

// ✅ Container component (logic only)
export const UserCardContainer: React.FC = () => {
  const { user, loading } = useUser()
  const { editUser } = useUserActions()
  
  const handleEdit = useCallback((id: string) => {
    editUser(id)
  }, [editUser])
  
  return (
    <UserCard 
      user={user} 
      onEdit={handleEdit} 
      loading={loading} 
    />
  )
}
```

## 🎯 Uber - Performance Issues

### **Problema Original**
```typescript
// ❌ Performance issues
const ExpensiveList = ({ items }) => {
  const processedItems = items.map(item => {
    // Processamento caro
    return expensiveCalculation(item)
  })
  
  return (
    <div>
      {processedItems.map(item => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  )
}
```

### **Solução Implementada**
```typescript
// ✅ useMemo para cálculos caros
const ExpensiveList: React.FC<{ items: Item[] }> = ({ items }) => {
  const processedItems = useMemo(() => {
    return items.map(item => expensiveCalculation(item))
  }, [items])
  
  return (
    <div>
      {processedItems.map(item => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  )
}

// ✅ React.memo para componentes caros
const ExpensiveItem = React.memo<{ item: ProcessedItem }>(({ item }) => {
  return (
    <div className="expensive-item">
      {/* Component logic */}
    </div>
  )
})

// ✅ useCallback para function props
const ExpensiveListContainer: React.FC = () => {
  const { items } = useItems()
  
  const handleItemClick = useCallback((itemId: string) => {
    // Handle item click
  }, [])
  
  return (
    <ExpensiveList 
      items={items} 
      onItemClick={handleItemClick}
    />
  )
}
```

## 🎯 Spotify - UI Inconsistency

### **Problema Original**
```typescript
// ❌ UI inconsistente
const UserProfile = ({ user }) => {
  return (
    <div style={{ padding: '10px', margin: '5px' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>
        {user.name}
      </h1>
      <button style={{ 
        backgroundColor: 'green', 
        color: 'white',
        padding: '8px 16px'
      }}>
        Follow
      </button>
    </div>
  )
}
```

### **Solução Implementada**
```typescript
// ✅ Design system components
import { Card, Typography, Button } from '@/components/ui'

interface UserProfileProps {
  user: User
  onFollow: (userId: string) => void
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  user, 
  onFollow 
}) => {
  return (
    <Card className="user-profile">
      <Typography variant="h1" className="user-name">
        {user.name}
      </Typography>
      <Button 
        variant="primary"
        onClick={() => onFollow(user.id)}
      >
        Follow
      </Button>
    </Card>
  )
}

// ✅ Consistent naming conventions
export const UserProfileContainer: React.FC = () => {
  const { user } = useUser()
  const { followUser } = useUserActions()
  
  const handleFollow = useCallback((userId: string) => {
    followUser(userId)
  }, [followUser])
  
  return (
    <UserProfile 
      user={user} 
      onFollow={handleFollow}
    />
  )
}
```

## 🔧 Error Handling Avançado

### **Network Errors com Retry**
```typescript
// ✅ Retry com exponential backoff
const fetchWithRetry = async (
  url: string, 
  retries = 3,
  delay = 1000
): Promise<Response> => {
  try {
    return await fetch(url)
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => 
        setTimeout(resolve, delay * (4 - retries))
      )
      return fetchWithRetry(url, retries - 1, delay * 2)
    }
    throw error
  }
}

// ✅ Repository pattern com error handling
class UserRepository {
  async getUser(id: string): Promise<User> {
    try {
      const response = await fetchWithRetry(`/api/users/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      throw new UserNotFoundError(`User ${id} not found`)
    }
  }
}
```

### **Validation Errors**
```typescript
// ✅ Validation com mensagens específicas
const validateUser = (user: unknown): ValidationResult => {
  if (!user || typeof user !== 'object') {
    return { 
      valid: false, 
      error: 'User data is required' 
    }
  }
  
  const userObj = user as Record<string, unknown>
  
  if (!userObj.email || typeof userObj.email !== 'string') {
    return { 
      valid: false, 
      error: 'Valid email is required' 
    }
  }
  
  if (!userObj.email.includes('@')) {
    return { 
      valid: false, 
      error: 'Invalid email format' 
    }
  }
  
  return { valid: true }
}

// ✅ Error boundaries
class UserErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('User component error:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <UserErrorFallback />
    }
    
    return this.props.children
  }
}
```

### **Unknown Errors**
```typescript
// ✅ Fallback graceful
const handleError = (error: unknown): string => {
  if (error instanceof NetworkError) {
    return 'Erro de conexão. Tente novamente.'
  }
  
  if (error instanceof ValidationError) {
    return error.message
  }
  
  if (error instanceof UserNotFoundError) {
    return 'Usuário não encontrado.'
  }
  
  // Log para debugging
  console.error('Unknown error:', error)
  
  return 'Erro inesperado. Contate o suporte.'
}

// ✅ Hook para error handling
const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null)
  
  const handleError = useCallback((error: unknown) => {
    const message = handleError(error)
    setError(message)
  }, [])
  
  const clearError = useCallback(() => {
    setError(null)
  }, [])
  
  return { error, handleError, clearError }
}
```

## 📊 Performance Monitoring

### **Core Web Vitals**
```typescript
// ✅ Performance monitoring
const usePerformanceMonitoring = () => {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
          }
        }
      })
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    }
  }, [])
}

// ✅ Bundle size monitoring
const useBundleSizeMonitoring = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script')
      script.src = 'https://bundlephobia.com/api/v1/size'
      document.head.appendChild(script)
    }
  }, [])
}
```

---

*Baseado em análise de 7.4k+ cases reais do [frontend-case-studies](https://github.com/andrew--r/frontend-case-studies)* 