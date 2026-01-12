# 🎓 Tutorial: Create Your First ETL Pipeline

## 📋 **What We'll Build**

A simple ETL pipeline that:
1. **Extracts** data from Pub/Sub
2. **Transforms** and validates in Bronze layer
3. **Loads** into BigQuery Data Vault (Silver)
4. **Serves** via Data Mart (Gold)

**Time:** 5-10 minutes

---

## 🚀 **Step-by-Step Tutorial**

### **Step 1: Start the Application**

```bash
# Make sure your API key is set
cat .env.local
# Should show: NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...

# Start dev server
npm run dev

# Open browser
# http://localhost:3000
```

You should see:
- ✅ Dark canvas with grid
- ✅ Node palette on the left
- ✅ AI assistant panel on the right
- ✅ Toolbar at the top

---

### **Step 2: Add Source Node (Extract)**

**What:** Where your data comes from

**How:**
1. Look at the **left sidebar** (Node Palette)
2. Find the **"🔌 Sources"** section
3. **Drag "📨 Pub/Sub"** onto the canvas
4. Drop it anywhere on the canvas

**Result:** You'll see a blue node with "Pub/Sub" label

**Configure it:**
1. **Click** the node you just added
2. **Right panel** opens (Properties Panel)
3. Change the **Label** to: `Trading Events Source`
4. The node updates automatically!

---

### **Step 3: Add Landing Node (Bronze Layer)**

**What:** Raw data landing zone

**How:**
1. In left sidebar, find **"🥉 Bronze Layers"**
2. **Drag "📥 Landing"** onto canvas
3. Drop it to the **right** of your Source node

**Configure it:**
1. **Click** the Landing node
2. In properties panel:
   - **Label:** `Raw Trading Data`
   - **Storage Type:** `biglake` (dropdown)
   - **Format:** `parquet` (dropdown)
3. See the node update with your settings!

---

### **Step 4: Connect Source to Landing**

**What:** Show data flow direction

**How:**
1. **Hover** over the Source node
2. See a **small circle on the right** (output handle)
3. **Click and drag** from that circle
4. **Drop on the Landing node** (on the left circle)

**Result:** You'll see an animated line connecting them! 🎉

---

### **Step 5: Add Validation Node (Data Quality)**

**What:** Check data quality

**How:**
1. In left sidebar, find **"🥉 Bronze Layers"**
2. **Drag "✓ Validation"** onto canvas
3. Drop it to the **right** of Landing node

**Configure it:**
1. **Click** the Validation node
2. **Label:** `Trading Data Validation`

**Connect it:**
1. Drag from Landing (right circle) to Validation (left circle)

---

### **Step 6: Add Data Vault (Silver Layer)**

**What:** Historical data vault storage

**How:**
1. In left sidebar, find **"🥈 Silver Layers"**
2. **Drag "🏗️ Data Vault"** onto canvas
3. Drop it to the **right** of Validation node

**Configure it:**
1. **Click** the Data Vault node
2. **Label:** `Trading Data Vault`

**Connect it:**
1. Drag from Validation to Data Vault

---

### **Step 7: Add Data Mart (Gold Layer)**

**What:** Business-ready analytics tables

**How:**
1. In left sidebar, find **"🥇 Gold Layers"**
2. **Drag "🏪 Data Mart"** onto canvas
3. Drop it to the **right** of Data Vault node

**Configure it:**
1. **Click** the Data Mart node
2. **Label:** `Trading Analytics`

**Connect it:**
1. Drag from Data Vault to Data Mart

---

### **Step 8: Review Your Pipeline**

You should now see:

```
📨 Source → 📥 Landing → ✓ Validation → 🏗️ Data Vault → 🏪 Data Mart
(Blue)      (Orange)     (Green)         (Purple)        (Red)
```

**Each layer color-coded:**
- Bronze = Orange
- Silver = Purple
- Gold = Red

---

## 🤖 **Step 9: Use AI Assistant (Optional)**

### **Chat with AI**

1. **Click** the **"Chat"** tab in the AI panel (right side)
2. **Type:** `What DQ rules should I add for trading data?`
3. **Press Enter**
4. AI will suggest rules like:
   - Check for NULL values
   - Validate price ranges
   - Check timestamp formats

### **View Suggestions**

1. **Click** the **"Suggestions"** tab
2. See AI recommendations like:
   - "Add Quarantine Layer"
   - "Enable Advanced Runtime"
3. **Click "Apply Suggestion"** on any card
4. AI will add/update nodes automatically!

---

## 💾 **Step 10: Export Your Pipeline**

**Save your work:**

1. **Click** the **"💾 Export"** button in toolbar (top)
2. A JSON file downloads: `pipeline-[timestamp].json`
3. **Save it** somewhere safe

**Contains:**
- All your nodes
- All connections
- All properties
- Complete pipeline definition

---

## 🔄 **Step 11: Switch Environments (Optional)**

**Test read-only mode:**

1. **Click** the **"🌍 Switch Environment"** button in toolbar
2. Environment changes: **DEV → UAT → PROD**
3. In **UAT/PROD**:
   - See **🔒 Read-only** badge
   - Can't edit nodes
   - Can't add new nodes
   - AI panel disappears
4. **Click again** to go back to **DEV**

---

## 🎨 **UI Tips & Tricks**

### **Moving Nodes**
- **Click and drag** any node to reposition
- Connections move with the nodes

### **Selecting Nodes**
- **Click** a node to select it
- Properties panel appears on right
- Node gets colored border

### **Deleting Nodes**
- **Select** the node
- **Press Delete** or **Backspace** key
- Or use the **🗑️ Clear** button (removes all)

### **Zooming**
- **Mouse wheel** to zoom in/out
- Or use controls in **bottom-left corner**

### **Panning**
- **Click and drag** on empty canvas space
- Or hold **Space + Drag**

### **Minimap**
- **Bottom-right corner** shows full pipeline
- **Click** to jump to different areas

---

## 📊 **What Each Node Does**

### **Source Node (Blue)**
- **Purpose:** Data ingestion point
- **Types:** Pub/Sub, Cloud Storage, Database CDC
- **Config:** Connection details, format, topic name

### **Landing Node (Orange - Bronze)**
- **Purpose:** Raw data storage
- **Config:** Storage type (BigQuery/BigLake), format (Parquet/Avro), retention
- **Features:** Immutable, time-travel, audit trail

### **Validation Node (Green - Bronze)**
- **Purpose:** Data quality checks
- **Config:** DQ rules, quarantine table, failure actions
- **Features:** AI-generated rules, automatic quarantine

### **Ingestion Node (Orange - Bronze)**
- **Purpose:** Data processing/transformation
- **Config:** Processing engine (Dataflow/Spark/BigQuery), transformations
- **Features:** Auto-scaling, resource management

### **Data Vault Node (Purple - Silver)**
- **Purpose:** Historical data storage
- **Config:** Hubs, Links, Satellites structure
- **Features:** AI-generated, optimized, slowly-changing dimensions

### **Business Vault Node (Purple - Silver)**
- **Purpose:** Business logic layer
- **Config:** PIT tables, Bridge tables, Business rules
- **Features:** Query optimization, calculated fields

### **Data Mart Node (Red - Gold)**
- **Purpose:** Analytics-ready dimensional model
- **Config:** Facts, Dimensions, Aggregates
- **Features:** Denormalized, optimized for BI tools

### **Custom Layer Node (Any Color)**
- **Purpose:** Your own layer definition
- **Config:** Completely flexible
- **Features:** Customer-defined, any architecture pattern

---

## 🎯 **Example Pipelines**

### **Simple 3-Layer Pipeline**

```
Source → Landing → Data Mart
         (Bronze)   (Gold)
```

**Use case:** Quick analytics without history

---

### **Standard 5-Layer Pipeline** (What we just built)

```
Source → Landing → Validation → Data Vault → Data Mart
         (Bronze)   (Bronze)     (Silver)     (Gold)
```

**Use case:** Production ETL with quality checks and history

---

### **Complex 7-Layer Pipeline**

```
Source → Landing → Validation → Ingestion → Data Vault → Business Vault → Data Mart
         (Bronze)   (Bronze)     (Bronze)     (Silver)     (Silver)         (Gold)
```

**Use case:** Enterprise with complex transformations

---

### **Financial Services 11-Layer Pipeline**

```
Source
  ↓
Landing (External)
  ↓
Landing (Internal)
  ↓
Quarantine
  ↓
Validation
  ↓
Standardization
  ↓
Reconciliation
  ↓
Raw Vault
  ↓
Business Vault
  ↓
Regulatory Reports
  ↓
Trading Mart
```

**Use case:** Regulatory compliance (DORA, BCBS 239)

---

## 💡 **Real-World Example: Trading Pipeline**

Let's build something more realistic!

### **Scenario:**
You're ingesting real-time trading data and need:
- Raw history for audit
- Data quality checks
- Real-time analytics

### **Pipeline:**

**1. Source Node**
- Label: `Pub/Sub: Trading Events`
- Topic: `projects/my-project/topics/trading-events`
- Rate: 10,000 events/sec

**2. Landing Node**
- Label: `BigLake: Raw Trades`
- Storage: BigLake (Iceberg format)
- Partition: Daily
- Retention: 7 years (regulatory)

**3. Validation Node**
- Label: `DQ: Trading Validation`
- Rules:
  - `price > 0`
  - `quantity > 0`
  - `timestamp IS NOT NULL`
  - `symbol IN (SELECT symbol FROM ref_securities)`
- Quarantine: `quarantine.failed_trades`

**4. Data Vault Node**
- Label: `Raw Vault: Trading`
- Hubs:
  - `hub_security` (symbol, exchange)
  - `hub_trader` (trader_id)
  - `hub_counterparty` (counterparty_id)
- Links:
  - `link_trade` (security + trader + counterparty)
- Satellites:
  - `sat_trade_details` (price, quantity, timestamp)
  - `sat_security_details` (name, sector, market_cap)

**5. Business Vault Node**
- Label: `Business Vault: Trading Metrics`
- PIT Tables:
  - `pit_trader_positions` (current positions per trader)
  - `pit_security_metrics` (daily metrics per security)
- Business Rules:
  - `realized_pnl = (sell_price - buy_price) * quantity`
  - `exposure = position_size * current_price`

**6. Data Mart Node**
- Label: `Trading Analytics Mart`
- Facts:
  - `fact_trades` (grain: one row per trade)
  - `fact_daily_pnl` (grain: trader per day)
- Dimensions:
  - `dim_security`
  - `dim_trader`
  - `dim_date`
- Aggregates:
  - `agg_trader_daily_volume`
  - `agg_security_liquidity`

### **Result:**
- **Raw audit trail** (7 years)
- **Real-time DQ** (quarantine bad data)
- **Historical tracking** (every change)
- **Fast analytics** (pre-aggregated)

---

## 🎓 **Advanced Features**

### **Multi-Layer Bronze**

Want more layers in Bronze? Just add them!

```
Source → Landing → Quarantine → Validation → Standardization → Enrichment
```

**Drag multiple nodes, connect them sequentially!**

---

### **Parallel Processing**

Want to split data flow?

```
           ┌→ Data Vault 1 (Trading)
Validation ├→ Data Vault 2 (Risk)
           └→ Data Vault 3 (Compliance)
```

**Connect one node to multiple downstream nodes!**

---

### **Template Pipelines**

At the bottom of the Node Palette:

**📚 Templates**
- **🎯 Simple 3-Layer** - Quick start
- **🏢 Enterprise** - 11-layer compliance

**Click** to auto-generate an entire pipeline!

---

## 🔍 **Viewing Node Details**

**Click any node to see:**

### **Source Node Details:**
- Source type (Pub/Sub, GCS, DB)
- Connection info
- Topic/bucket/table

### **Landing Node Details:**
- Storage type
- Format
- Partitioning
- Retention policy
- Immutability flag

### **Validation Node Details:**
- DQ rules list (with SQL)
- Quarantine table
- Failure action
- AI-generated badge

### **Data Vault Node Details:**
- Hub count
- Link count
- Satellite count
- Optimization flags
- AI-generated badge

### **Data Mart Details:**
- Fact table count
- Dimension count
- Aggregate count
- Continuous query flag

---

## 🎨 **Customizing Nodes**

**Every node can be customized!**

### **Change Labels:**
1. Click node
2. Edit "Label" field
3. Updates live!

### **Change Settings:**
1. Click node
2. Use dropdowns
3. Edit fields
4. Changes save automatically

### **Add Descriptions:**
1. Click node
2. Scroll to "Description" field
3. Add notes about the layer
4. Helps document your pipeline!

---

## 🚀 **What's Next?**

### **Basic Pipeline Complete!**

You now know how to:
- ✅ Add nodes
- ✅ Connect them
- ✅ Configure properties
- ✅ Use AI assistance
- ✅ Export pipeline
- ✅ Switch environments

### **Next Steps:**

1. **Try importing a mapping file** (Excel/CSV)
   - Click "📁 Import Mapping"
   - AI generates Data Vault automatically!

2. **Generate code**
   - Click "👁️ Preview Code"
   - See Dataform SQL generated!

3. **Deploy**
   - Click "🚀 Deploy"
   - Push to Cloud Run/GKE

4. **Build complex pipelines**
   - Add more layers
   - Try parallel flows
   - Use custom layers

---

## 📝 **Summary**

**You built this pipeline:**

```
📨 Trading Events (Pub/Sub)
    ↓
📥 Raw Trading Data (BigLake Parquet)
    ↓
✓ Trading Data Validation (DQ Rules)
    ↓
🏗️ Trading Data Vault (Hubs/Links/Sats)
    ↓
🏪 Trading Analytics (Dimensional Model)
```

**In just 5 minutes!**

**With:**
- ✅ Visual design (no code)
- ✅ AI suggestions
- ✅ Type-safe configuration
- ✅ Environment management
- ✅ Export capability

---

## 🎉 **Congratulations!**

You've created your first ETL pipeline in the Visual Pipeline Designer!

**Keep exploring:**
- Try different node types
- Chat with AI for advice
- Build more complex flows
- Generate production code

**Happy building!** 🚀
