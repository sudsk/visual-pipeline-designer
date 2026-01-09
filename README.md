# 🎨 Visual Pipeline Designer

**AI-Powered Visual Designer for GCP Data Pipelines**

Build complex data pipelines visually with drag-and-drop, automatic Data Vault generation, and intelligent suggestions powered by Claude AI.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-Apache%202.0-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)

---

## ✨ Features

### 🎯 Visual Pipeline Design
- **Drag-and-drop canvas** powered by ReactFlow
- **8 specialized node types** (Source, Landing, Validation, Data Vault, etc.)
- **Real-time connection** validation and visual feedback
- **Multi-layer architecture** support (Bronze/Silver/Gold)

### 🤖 AI-Powered Assistance
- **Claude AI integration** for intelligent suggestions
- **Auto-generate Data Vault structures** from mappings
- **Smart DQ rule generation** based on data types
- **Chat interface** for pipeline architecture questions

### 🏗️ Enterprise-Ready
- **Environment management** (DEV/UAT/PROD) with read-only modes
- **Dataform code generation** with SQL optimization
- **Excel/CSV mapping import** with validation
- **Complete TypeScript** type safety

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/visual-pipeline-designer.git
cd visual-pipeline-designer

# 2. Install dependencies
npm install

# 3. Add your Anthropic API key
echo "NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local

# 4. Start development server
npm run dev

# 5. Open your browser
# http://localhost:3000
```

**That's it! 🎉** You should now see the Visual Pipeline Designer running.

---

## 📁 Project Structure

```
visual-pipeline-designer/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main entry point
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── PipelineDesigner.tsx     # Main canvas component
│   ├── Toolbar.tsx              # Top toolbar
│   ├── NodePalette.tsx          # Node palette sidebar
│   ├── PropertiesPanel.tsx      # Properties editor
│   │
│   ├── nodes/                   # Node components
│   │   ├── SourceNode.tsx       # Data sources (Pub/Sub, GCS, DB)
│   │   ├── LandingNode.tsx      # Landing layer
│   │   ├── ValidationNode.tsx   # DQ validation
│   │   ├── IngestionNode.tsx    # Processing engines
│   │   ├── DataVaultNode.tsx    # Raw Data Vault
│   │   ├── BusinessVaultNode.tsx # Business Vault
│   │   ├── DataMartNode.tsx     # Gold layer marts
│   │   └── CustomLayerNode.tsx  # Custom layers
│   │
│   └── panels/
│       └── AIAssistantPanel.tsx # AI chat interface
│
├── store/                        # Zustand state management
│   ├── pipelineStore.ts         # Pipeline state
│   ├── environmentStore.ts      # Environment state
│   └── agentStore.ts            # AI assistant state
│
├── types/                        # TypeScript definitions
│   └── pipeline.ts              # Complete type definitions
│
├── lib/                          # Utilities
│   ├── anthropic.ts             # Claude API integration
│   ├── dataform-generator.ts    # SQL code generation
│   └── mapping-parser.ts        # Excel/CSV parsing
│
└── package.json                  # Dependencies
```

---

## 🎓 Usage Guide

### Creating Your First Pipeline

1. **Add Nodes**: Drag nodes from the palette on the left to the canvas
2. **Connect Nodes**: Click and drag from output handles (right) to input handles (left)
3. **Edit Properties**: Click any node to edit its properties in the right panel
4. **AI Suggestions**: Check the AI panel for intelligent optimization suggestions
5. **Export**: Click "Export" in the toolbar to save your pipeline as JSON

### Node Types

| Node Type | Description | Layer |
|-----------|-------------|-------|
| **Source** | Data sources (Pub/Sub, GCS, Database CDC) | - |
| **Landing** | Raw data ingestion with format specification | Bronze |
| **Validation** | Data quality checks with DQ rules | Bronze |
| **Ingestion** | Processing engine (Dataflow, Spark, BigQuery) | Bronze |
| **Data Vault** | Raw Data Vault (Hubs, Links, Satellites) | Silver |
| **Business Vault** | Business logic (PIT, Bridge tables) | Silver |
| **Data Mart** | Dimensional models (Facts, Dimensions) | Gold |
| **Custom Layer** | Flexible user-defined layers | Any |

### Environment Management

Switch between environments using the toolbar:

- **🟢 DEV**: Full editing capabilities, AI assistant enabled
- **🟡 UAT**: Read-only mode, validation and documentation
- **🔴 PROD**: Read-only mode, monitoring and audit

---

## 🤖 AI Features

### Chat with Claude

Ask questions about your pipeline:
- "How should I structure my Data Vault for trading data?"
- "What DQ rules should I add for customer data?"
- "How can I optimize query performance?"

### Auto-Generate Data Vault

1. Import Excel/CSV mapping file
2. AI analyzes the mappings
3. Automatically generates Hubs, Links, and Satellites
4. Creates optimized SQL code

### Smart Suggestions

The AI assistant provides context-aware suggestions:
- Architecture improvements
- Performance optimizations
- Cost reduction opportunities
- Compliance requirements

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Canvas**: [ReactFlow](https://reactflow.dev/)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/)
- **AI**: [Anthropic Claude](https://www.anthropic.com/)
- **File Parsing**: XLSX, Papaparse

---

## 📊 What's Included

### Complete Application
- ✅ **25 production-ready files**
- ✅ **3,500+ lines of code**
- ✅ **100% TypeScript** with full type safety
- ✅ **13 React components**
- ✅ **3 Zustand stores**
- ✅ **15+ utility functions**

### Features Ready to Use
- ✅ Visual drag-and-drop canvas
- ✅ 8 different node types
- ✅ Environment switching (DEV/UAT/PROD)
- ✅ AI chat assistant
- ✅ Code generation (Dataform SQL)
- ✅ Properties editor
- ✅ Dark theme with animations
- ✅ Excel/CSV import

---

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Environment Variables

Create a `.env.local` file:

```bash
# Anthropic API Key (Required)
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-key-here

# Environment (Optional, defaults to 'dev')
NEXT_PUBLIC_ENVIRONMENT=dev

# Feature Flags (Optional)
NEXT_PUBLIC_ENABLE_AI=true
NEXT_PUBLIC_ENABLE_CODE_GENERATION=true
```

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### "API key not set" warning
Make sure your `.env.local` file exists with:
```
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Build errors
```bash
rm -rf .next
npm run dev
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

---

## 📚 Documentation

Additional documentation available in the `docs/` directory:

- **BUILD_GUIDE.md** - Detailed build instructions
- **ARCHITECTURE.md** - Technical architecture overview
- **ENVIRONMENT_STRATEGY.md** - Environment setup guide
- **MULTI_LAYER_ARCHITECTURE.md** - Layer configuration patterns
- **FLEXIBLE_ARCHITECTURE.md** - Customization guide

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Visual canvas powered by [ReactFlow](https://reactflow.dev/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/visual-pipeline-designer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/visual-pipeline-designer/discussions)

---

## 🎯 Roadmap

- [ ] Deploy button integration with Cloud Run
- [ ] Real-time collaboration
- [ ] Version control for pipelines
- [ ] Pipeline templates library
- [ ] Integration with dbt Cloud
- [ ] Cost estimation calculator
- [ ] Performance profiling

---

## ⭐ Star History

If you find this project useful, please consider giving it a star!

---

**Made with ❤️ for the Data Engineering community**

Happy building! 🚀
