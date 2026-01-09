#!/bin/bash

# 🚀 Visual Pipeline Designer - Quick Start Script
# This script automates the initial setup process

set -e  # Exit on any error

echo "🚀 Visual Pipeline Designer - Quick Start"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check prerequisites
echo "📋 Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi
print_success "Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_success "npm $(npm -v) detected"

# Check Git
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi
print_success "Git $(git --version | cut -d' ' -f3) detected"

# Check GitHub CLI (optional)
if command -v gh &> /dev/null; then
    print_success "GitHub CLI detected"
    HAS_GH_CLI=true
else
    print_warning "GitHub CLI not found (optional, but recommended)"
    print_info "Install with: brew install gh (Mac) or see https://cli.github.com/"
    HAS_GH_CLI=false
fi

echo ""
echo "✅ All prerequisites met!"
echo ""

# Get user input
echo "📝 Configuration"
echo "==============="
echo ""

# Project directory
read -p "Enter project directory name [visual-pipeline-designer]: " PROJECT_DIR
PROJECT_DIR=${PROJECT_DIR:-visual-pipeline-designer}

# GitHub username (if using GH CLI)
if [ "$HAS_GH_CLI" = true ]; then
    read -p "Create GitHub repository? (y/n) [y]: " CREATE_REPO
    CREATE_REPO=${CREATE_REPO:-y}
    
    if [ "$CREATE_REPO" = "y" ]; then
        read -p "Repository visibility (public/private) [private]: " REPO_VISIBILITY
        REPO_VISIBILITY=${REPO_VISIBILITY:-private}
    fi
fi

# Anthropic API key
read -p "Enter Anthropic API key (or press Enter to skip): " ANTHROPIC_API_KEY

echo ""
echo "🏗️  Starting setup..."
echo ""

# Create GitHub repository (if requested)
if [ "$HAS_GH_CLI" = true ] && [ "$CREATE_REPO" = "y" ]; then
    echo "📦 Creating GitHub repository..."
    
    if gh repo create "$PROJECT_DIR" \
        --"$REPO_VISIBILITY" \
        --description "Visual Designer for GCP Data Pipelines with AI-powered Data Vault generation" \
        --add-readme \
        --license apache-2.0 \
        --clone; then
        print_success "Repository created and cloned"
        cd "$PROJECT_DIR"
    else
        print_error "Failed to create repository"
        exit 1
    fi
else
    # Manual repository setup
    echo "📁 Creating local directory..."
    mkdir -p "$PROJECT_DIR"
    cd "$PROJECT_DIR"
    git init
    print_success "Local repository initialized"
fi

# Create directory structure
echo ""
echo "📁 Creating directory structure..."

mkdir -p packages/web-app
mkdir -p packages/shared
mkdir -p packages/examples
mkdir -p docs
mkdir -p .github/workflows

print_success "Directory structure created"

# Create root package.json
echo ""
echo "📦 Creating root package.json..."

cat > package.json << 'EOF'
{
  "name": "visual-pipeline-designer",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=packages/web-app",
    "build": "npm run build --workspace=packages/web-app",
    "lint": "npm run lint --workspaces",
    "test": "npm run test --workspaces",
    "clean": "rm -rf node_modules packages/*/node_modules packages/*/.next"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
EOF

print_success "Root package.json created"

# Create .gitignore
echo ""
echo "📝 Creating .gitignore..."

cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Next.js
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env*.local

# Testing
coverage/
.nyc_output/

# Misc
.DS_Store
*.log
*.swp
*.swo
*~

# IDE
.vscode/
.idea/
*.iml

# Turbo
.turbo/

# Build outputs
*.tsbuildinfo
EOF

print_success ".gitignore created"

# Create README
echo ""
echo "📄 Creating README.md..."

cat > README.md << 'EOF'
# 🎨 Visual Pipeline Designer

Visual Designer for GCP Data Pipelines with AI-powered Data Vault generation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

## 📚 Documentation

See the [docs](./docs) directory for detailed documentation:

- [Architecture](./docs/ARCHITECTURE.md)
- [Build Guide](./docs/BUILD_GUIDE.md)
- [Environment Strategy](./docs/ENVIRONMENT_STRATEGY.md)
- [Multi-Layer Architecture](./docs/MULTI_LAYER_ARCHITECTURE.md)

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Visual Canvas:** ReactFlow
- **State Management:** Zustand
- **AI:** Anthropic Claude (Sonnet 4)
- **Deployment:** Google Cloud Run

## 📁 Project Structure

```
visual-pipeline-designer/
├── packages/
│   ├── web-app/          # Next.js Visual Designer
│   ├── shared/           # Shared types and utilities
│   └── examples/         # Example pipelines
├── docs/                 # Documentation
└── .github/              # GitHub workflows
```

## 🎯 Features

- ✅ Visual drag-and-drop pipeline designer
- ✅ AI-powered Data Vault generation
- ✅ Multi-layer architecture support
- ✅ Flexible, non-prescriptive design
- ✅ Environment strategy (DEV/UAT/PROD)
- ✅ Mapping file import (Excel/CSV)
- ✅ Dataform code generation

## 📝 License

Apache 2.0 (Open Core Model)
EOF

print_success "README.md created"

# Setup Next.js app
echo ""
echo "⚛️  Setting up Next.js application..."
cd packages/web-app

# Create Next.js app
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm \
  --yes

print_success "Next.js app created"

# Install additional dependencies
echo ""
echo "📦 Installing additional dependencies..."

npm install \
  reactflow \
  zustand \
  @anthropic-ai/sdk \
  papaparse \
  xlsx

npm install -D \
  @types/papaparse

print_success "Dependencies installed"

# Create additional directories
echo ""
echo "📁 Creating component directories..."

mkdir -p components/nodes
mkdir -p components/panels
mkdir -p components/ui
mkdir -p lib
mkdir -p store
mkdir -p types
mkdir -p hooks
mkdir -p utils
mkdir -p public/demo

print_success "Component directories created"

# Create .env.local template
echo ""
echo "🔐 Creating .env.local template..."

cat > .env.local << EOF
# Anthropic API Key
NEXT_PUBLIC_ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}

# Environment
NEXT_PUBLIC_ENVIRONMENT=dev

# Feature Flags
NEXT_PUBLIC_ENABLE_AI=true
NEXT_PUBLIC_ENABLE_CODE_GENERATION=true
EOF

print_success ".env.local created"

# Create basic store files
echo ""
echo "🏪 Creating Zustand stores..."

cat > store/pipelineStore.ts << 'EOF'
import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

interface PipelineState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  addNode: (node: Node) => void;
  updateNode: (id: string, data: any) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (id: string) => void;
  selectNode: (node: Node | null) => void;
  clear: () => void;
}

export const usePipelineStore = create<PipelineState>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map(n => n.id === id ? { ...n, data: { ...n.data, ...data } } : n)
  })),
  
  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter(n => n.id !== id),
    edges: state.edges.filter(e => e.source !== id && e.target !== id),
    selectedNode: state.selectedNode?.id === id ? null : state.selectedNode
  })),
  
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),
  
  deleteEdge: (id) => set((state) => ({
    edges: state.edges.filter(e => e.id !== id)
  })),
  
  selectNode: (node) => set({ selectedNode: node }),
  
  clear: () => set({ nodes: [], edges: [], selectedNode: null })
}));
EOF

print_success "pipelineStore.ts created"

# Create types
echo ""
echo "📝 Creating TypeScript types..."

cat > types/pipeline.ts << 'EOF'
export interface PipelineNode {
  id: string;
  type: string;
  label: string;
  data: Record<string, any>;
  position: { x: number; y: number };
}

export interface LayerConfig {
  id: string;
  name: string;
  category: 'bronze' | 'silver' | 'gold' | 'custom';
  description?: string;
  customProperties?: Record<string, any>;
}

export interface DataVaultStructure {
  hubs: Hub[];
  links: Link[];
  satellites: Satellite[];
}

export interface Hub {
  name: string;
  businessKeys: string[];
  source: string;
}

export interface Link {
  name: string;
  hubs: string[];
  relationshipType: string;
}

export interface Satellite {
  name: string;
  parent: string;
  parentType: 'hub' | 'link';
  attributes: string[];
}
EOF

print_success "types/pipeline.ts created"

# Go back to root
cd ../..

# Initial git commit
echo ""
echo "📤 Creating initial commit..."

git add .
git commit -m "chore: Initial project setup

- Next.js 14 with TypeScript and Tailwind
- ReactFlow for visual canvas
- Zustand for state management
- Anthropic Claude integration
- Basic project structure" || print_warning "Commit skipped (may already exist)"

print_success "Initial commit created"

# Create GitHub workflows
echo ""
echo "🔄 Creating GitHub workflows..."

mkdir -p .github/workflows

cat > .github/workflows/ci.yml << 'EOF'
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint --workspace=packages/web-app
      
      - name: Build
        run: npm run build --workspace=packages/web-app
EOF

print_success "CI workflow created"

# Summary
echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
print_info "Project: $PROJECT_DIR"
print_info "Location: $(pwd)"
echo ""
echo "📚 Next Steps:"
echo ""
echo "1. Start development server:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "2. Open browser:"
echo "   ${BLUE}http://localhost:3000${NC}"
echo ""
echo "3. Copy downloaded files:"
echo "   - Copy React components to packages/web-app/components/"
echo "   - Copy demo HTML to packages/web-app/public/demo/"
echo "   - Copy documentation to docs/"
echo ""
echo "4. Configure Anthropic API:"
echo "   - Edit packages/web-app/.env.local"
echo "   - Add your NEXT_PUBLIC_ANTHROPIC_API_KEY"
echo ""
echo "📖 Documentation:"
echo "   - Build Guide: docs/BUILD_GUIDE.md (copy from outputs)"
echo "   - Architecture: docs/ARCHITECTURE.md (copy from outputs)"
echo ""

if [ "$HAS_GH_CLI" = true ] && [ "$CREATE_REPO" = "y" ]; then
    echo "🔗 GitHub Repository:"
    echo "   $(gh repo view --json url -q .url)"
    echo ""
fi

echo "🚀 Happy building!"
echo ""
