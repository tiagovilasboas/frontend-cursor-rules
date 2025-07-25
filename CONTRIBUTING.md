# 🤝 Contribuindo para Frontend Cursor Rules

Obrigado por considerar contribuir para o projeto! Este documento fornece diretrizes para contribuições baseadas em **18 anos de experiência profissional** em desenvolvimento front-end.

## 📋 Como Contribuir

### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/frontend-cursor-rules.git
cd frontend-cursor-rules
```

### 2. Crie uma Branch
```bash
git checkout -b feature/nova-stack
# ou
git checkout -b fix/correcao-bug
```

### 3. Desenvolva sua Feature
- Adicione suas regras em `rules/`
- Atualize os scripts se necessário
- Teste suas mudanças

### 4. Commit e Push
```bash
git add .
git commit -m "feat: adiciona regras para Svelte"
git push origin feature/nova-stack
```

### 5. Abra um Pull Request
- Descreva claramente as mudanças
- Inclua exemplos de uso
- Referencie issues relacionadas

## 📁 Estrutura do Projeto

### Adicionando Novas Rules
```
rules/
├── 🏗️ GENERAL/.cursorrules     # Regras gerais
├── ⚛️ REACT/.cursorrules        # React + Next.js
├── 🟢 VUE/.cursorrules          # Vue + Nuxt.js
├── 🔷 ANGULAR/.cursorrules      # Angular
└── 🆕 NOVA-STACK/.cursorrules   # Sua nova stack
```

### Atualizando Scripts
```bash
# Atualize os scripts correspondentes
scripts/
├── linux/generate-rules.sh
├── windows/generate-rules.ps1
└── cross-platform/generate-rules.js
```

## 📝 Padrões de Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: adiciona regras para Svelte
fix: corrige caminho das regras no script PowerShell
docs: atualiza README com nova stack
style: formata código das regras
refactor: reorganiza estrutura de pastas
test: adiciona testes para nova stack
chore: atualiza dependências
```

## 🧪 Testando

```bash
# Teste os scripts
npm run help
npm run generate:react

# Teste PowerShell (Windows)
.\scripts\windows\generate-rules.ps1 -Help

# Teste Bash (Linux/macOS)
./scripts/linux/generate-rules.sh --help
```

## 📋 Checklist para PRs

- [ ] Regras seguem padrões do projeto
- [ ] Scripts atualizados para nova stack
- [ ] README atualizado
- [ ] Testes passando
- [ ] Commit messages seguem convenção
- [ ] Documentação atualizada

## 🎯 Diretrizes para Rules

### Estrutura Recomendada
```markdown
# 🏗️ Stack Name Rules
# Based on [projeto-referencia](link) and 18 years of front-end experience

## 📋 Visão Geral
Descrição da stack e objetivos

## 🎯 Objetivos
- Objetivo 1
- Objetivo 2

## 🚀 Padrões
- Padrão 1
- Padrão 2

## 📊 Exemplos
```typescript
// Exemplo de código
```

## 🎯 Próximos Passos
1. Passo 1
2. Passo 2
```

### Boas Práticas (Baseadas em 18 Anos de Experiência)
- **Base em projetos reais**: Use projetos em produção como referência
- **Padrões testados**: Inclua apenas práticas comprovadas
- **Exemplos práticos**: Mostre código real, não teórico
- **Organização clara**: Separe por seções lógicas
- **Comentários em inglês**: Para melhor compreensão da IA
- **Performance first**: Sempre considere performance
- **Security by design**: Implemente segurança desde o início
- **Scalability**: Pense em escalabilidade

## 🏆 Expertise Aplicada

### **18 Anos de Experiência Profissional**
- **Projetos de grande escala** em produção
- **Arquiteturas escaláveis** testadas
- **Padrões comprovados** que funcionam
- **Boas práticas** extraídas de projetos reais
- **Performance optimization** expertise
- **Security best practices** knowledge

### **Inspirações**
- **[ponto-pj](https://github.com/tiagovilasboas/ponto-pj)**: Arquitetura limpa e boas práticas
- **[awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)**: Formato e estrutura
- **Comunidade front-end**: Padrões emergentes

## 🤝 Código de Conduta

- Seja respeitoso e inclusivo
- Ajude outros contribuidores
- Mantenha discussões construtivas
- Reporte problemas de forma clara

## 📞 Suporte

- **Issues**: Para bugs e feature requests
- **Discussions**: Para dúvidas e discussões
- **Pull Requests**: Para contribuições

## 🎯 Tipos de Contribuição

### **Bem-vindos**
- ✅ Novas stacks (Svelte, SolidJS, etc.)
- ✅ Melhorias nas regras existentes
- ✅ Novos scripts/ferramentas
- ✅ Melhorias na documentação
- ✅ Correções de bugs
- ✅ Sugestões de performance

### **Especialmente Valorizados**
- 🏆 Regras baseadas em projetos reais
- 🏆 Padrões testados em produção
- 🏆 Exemplos práticos e funcionais
- 🏆 Melhorias de performance
- 🏆 Segurança e boas práticas

## ⚠️ **Importante: Base, Não Bala de Prata**

**Este projeto fornece uma base sólida, mas não é uma solução universal.**

### **Diretrizes para Contribuições**
- **📖 Contexto é tudo**: Sempre considere o contexto específico do projeto
- **🔧 Adaptabilidade**: As regras devem ser adaptáveis, não rígidas
- **🎯 Flexibilidade**: Diferentes projetos têm diferentes necessidades
- **🧠 Pensamento crítico**: Encoraje desenvolvedores a questionar e adaptar

### **Como Contribuir Responsavelmente**
- **Base em experiência real**: Contribua apenas padrões que você testou
- **Documente limitações**: Seja claro sobre quando e como usar
- **Forneça alternativas**: Mostre diferentes abordagens quando apropriado
- **Encoraje adaptação**: Sempre sugira personalização baseada no contexto

**Lembre-se**: O objetivo é fornecer um **caminho bem pavimentado**, não uma **camisa de força**. As melhores práticas vêm da experiência real e do contexto específico.

---

**Obrigado por contribuir para a comunidade front-end! 🚀** 