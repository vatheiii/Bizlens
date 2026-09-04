import { useState } from "react";

const tabs = ["Home", "Analytics", "AI", "Reports", "More"];

function MiniChart({ large = false }) {
  return (
    <svg
      className={large ? "dashboard-chart large" : "dashboard-chart"}
      viewBox="0 0 320 110"
      preserveAspectRatio="none"
      aria-label="Revenue trend chart"
    >
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7269c9" stopOpacity=".32" />
          <stop offset="1" stopColor="#7269c9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 89C24 77 25 86 45 76s24-10 40-4 22-13 38-12 17 7 30-8 22 5 34-4 19-12 30-8 15 15 27 2 19-18 28-25 25-9 48-14v107H0z"
        fill="url(#chartFill)"
      />
      <path
        d="M0 89C24 77 25 86 45 76s24-10 40-4 22-13 38-12 17 7 30-8 22 5 34-4 19-12 30-8 15 15 27 2 19-18 28-25 25-9 48-14"
        fill="none"
        stroke="#6f68bd"
        strokeWidth="3"
      />
    </svg>
  );
}

function BarChart({ onSelect }) {
  const openProducts = () => onSelect();
  return (
    <div
      className="bar-chart"
      role="button"
      tabIndex={0}
      aria-label="Open product analytics"
      onClick={openProducts}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProducts();
        }
      }}
    >
      {[38, 59, 45, 78, 61, 92, 73, 100, 68, 84].map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

function DashboardHome() {
  return (
    <>
      <div className="dashboard-greeting">
        <p>Hello, Sokha</p>
        <span>Here's your business overview</span>
      </div>
      <div className="metric-grid">
        <div>
          <span>Total Revenue</span>
          <b>$5,240</b>
          <em>+12.5%</em>
        </div>
        <div>
          <span>Total Expenses</span>
          <b>$1,020</b>
          <em>+5.2%</em>
        </div>
        <div>
          <span>Profit Margin</span>
          <b>19.5%</b>
          <em>+2.1%</em>
        </div>
        <div>
          <span>Orders</span>
          <b>245</b>
          <em>+8.4%</em>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="card-heading">
          <b>Sales Trend</b>
          <span>Monthly⌄</span>
        </div>
        <MiniChart />
      </div>
      <div className="dashboard-card product-card">
        <div className="card-heading">
          <b>Top Products</b>
          <button>View all</button>
        </div>
        {[
          ["Latte", "19.5%"],
          ["Matcha Latte", "15.3%"],
          ["Milk Tea", "10.5%"],
        ].map(([name, value], index) => (
          <div className="product-row" key={name}>
            <span className={`product-dot dot-${index}`} />
            {name}
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </>
  );
}

function UploadView({ onUploaded }) {
  return (
    <>
      <div className="dashboard-heading">
        <h1>Upload Business Data</h1>
        <p>Upload your sales, revenue, or expense data</p>
      </div>
      <div className="upload-box">
        <div className="cloud-icon">↥</div>
        <b>Upload CSV / Excel</b>
        <span>Drag and drop your file here</span>
        <button type="button" onClick={onUploaded}>
          Choose File
        </button>
        <small>Supported formats: CSV, Excel</small>
      </div>
      <div className="recent-upload">
        <b>Last Uploaded</b>
        <p>15 Aug 2025, 10:30 AM</p>
        <span>245 transactions</span>
      </div>
    </>
  );
}

function PreviewView({ onImport }) {
  return (
    <>
      <div className="dashboard-heading preview-heading">
        <h1>Preview Your Data</h1>
        <p>Review your data before importing</p>
      </div>
      <div className="preview-metrics">
        <div>
          <span>Total Rows</span>
          <b>245</b>
        </div>
        <div>
          <span>Total Columns</span>
          <b>6</b>
        </div>
      </div>
      <div className="data-table">
        <div className="data-row table-head">
          <b>Data</b>
          <b>Product</b>
          <b>Qty</b>
          <b>Price</b>
        </div>
        {[1, 2, 3, 4].map((row) => (
          <div className="data-row" key={row}>
            <span>Aug 1</span>
            <span>Latte</span>
            <span>12</span>
            <span>$2.50</span>
          </div>
        ))}
      </div>
      <button className="import-button" type="button" onClick={onImport}>
        Import Data
      </button>
    </>
  );
}

function AnalyticsView() {
  const [view, setView] = useState("revenue");
  const [period, setPeriod] = useState("3M");
  const periodData = {
    "7D": { revenue: "$1,220", change: "+4.8%", daily: "$174.3", orders: "58" },
    "30D": { revenue: "$5,240", change: "+12.5%", daily: "$174.6", orders: "245" },
    "3M": { revenue: "$15,820", change: "+18.2%", daily: "$176.2", orders: "732" },
    "1Y": { revenue: "$62,410", change: "+24.6%", daily: "$171.8", orders: "2,940" },
  };
  const selectedPeriod = periodData[period];
  return (
    <>
      <div className="dashboard-heading">
        <h1>Analytics</h1>
        <p>Understand what drives your business</p>
      </div>
      <div className="analytics-switcher">
        {[
          ["7D", "7 days"],
          ["30D", "30 days"],
          ["3M", "3 months"],
          ["1Y", "1 year"],
        ].map(([key, label]) => (
          <button
            key={key}
            className={period === key && view !== "products" ? "selected" : ""}
            onClick={() => {
              setPeriod(key);
              setView("revenue");
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {view === "revenue" && (
        <>
          <div className="dashboard-card">
            <div className="card-heading">
              <b>Total Revenue</b>
              <span>{period}⌄</span>
            </div>
            <strong className="big-number">
              {selectedPeriod.revenue} <em>{selectedPeriod.change}</em>
            </strong>
            <MiniChart large />
          </div>
          <div className="analytics-metrics">
            <div>
              <span>Avg Daily Sales</span>
              <b>{selectedPeriod.daily}</b>
              <em>{selectedPeriod.change}</em>
            </div>
            <div>
              <span>Total Orders</span>
              <b>{selectedPeriod.orders}</b>
              <em>+8.4%</em>
            </div>
          </div>
          <div className="dashboard-card chart-interactive">
            <div className="card-heading">
              <b>Sales by Day</b>
              <span>{period}⌄</span>
            </div>
            <BarChart onSelect={() => setView("products")} />
            <small className="chart-hint">Tap chart to view product analytics</small>
          </div>
        </>
      )}
      {view === "profit" && (
        <>
          <div className="analytics-metrics four">
            <div>
              <span>Revenue</span>
              <b>$5,240</b>
              <em>+12.5%</em>
            </div>
            <div>
              <span>Cost</span>
              <b>$4,220</b>
              <em className="negative">+5.2%</em>
            </div>
            <div>
              <span>Profit</span>
              <b>$1,020</b>
              <em>+8.4%</em>
            </div>
            <div>
              <span>Profit Margin</span>
              <b>19.5%</b>
              <em className="negative">-1.5%</em>
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-heading">
              <b>Profit Trend</b>
              <span>3M⌄</span>
            </div>
            <div className="chart-legend">
              <span className="legend-profit">● Profit</span>
              <span className="legend-margin">● Margin</span>
            </div>
            <MiniChart large />
          </div>
        </>
      )}
      {view === "products" && (
        <div className="dashboard-card product-analysis">
          <div className="dashboard-heading">
            <h1>Product Analytics</h1>
            <p>Top products by revenue</p>
          </div>
          <b className="list-title">Top Products by Revenue</b>
          {[
            ["Latte", "$5,240", "19.5%"],
            ["Matcha Latte", "$5,240", "19.5%"],
            ["Milk Tea", "$5,240", "19.5%"],
            ["Strawberry Latte", "$5,240", "19.5%"],
            ["Chocolate Cake", "$5,240", "19.5%"],
          ].map(([name, amount, margin], index) => (
            <div className="analysis-row" key={name}>
              <span className={`product-dot dot-${index % 3}`} />
              {name}
              <b>{amount}</b>
              <em>{margin}</em>
            </div>
          ))}
          <b className="list-title low-margin">Low Margin Products</b>
          {[
            "Strawberry Cake",
            "Blueberry Cake",
            "Cherry Soda",
            "Blueberry Soda",
            "Lemon Tea",
          ].map((name) => (
            <div className="analysis-row" key={name}>
              <span className="product-dot dot-2" />
              {name}
              <em>19.5%</em>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function AIView() {
  const [view, setView] = useState("insights");
  if (view === "chat")
    return (
      <div className="ai-view">
        <div className="dashboard-heading">
          <h1>BizLens Assistant</h1>
          <p>Ask anything about your business</p>
        </div>
        <div className="chat-bubble user-bubble">
          What caused my profit to decrease this month?
        </div>
        <div className="chat-bubble assistant-bubble">
          Your revenue increased 12.47%. While profit increased only 52%, your
          costs are growing faster than your sales.
        </div>
        <div className="suggestion-list">
          <button onClick={() => setView("detail")}>How to increase profit?</button>
          <button onClick={() => setView("detail")}>How to increase profit?</button>
          <button onClick={() => setView("detail")}>How to increase profit?</button>
        </div>
        <div className="chat-input">
          Type your question... <span>↑</span>
        </div>
      </div>
    );
  if (view === "detail")
    return (
      <div className="ai-view">
        <button className="ai-back" onClick={() => setView("insights")}>
          ‹ Product Analytics
        </button>
        <div className="dashboard-heading">
          <h1>Review Latte pricing</h1>
          <p>What we found</p>
        </div>
        <p className="detail-copy">
          Latte is one of your popular products, but its profit margin is only
          8%, which is significantly lower than your business average of
          19.5%.
        </p>
        <div className="detail-stats">
          <div>
            Revenue
            <b>$1,240</b>
          </div>
          <div>
            Margin
            <b>8%</b>
          </div>
          <div>
            Avg. Margin
            <b>19.8%</b>
          </div>
        </div>
        <b className="ai-section-title">AI Recommendations</b>
        <p className="detail-copy">Review ingredient costs and consider pricing.</p>
        <b className="ai-section-title">Suggested Actions</b>
        <p className="action-line">✓ Review ingredient cost</p>
        <p className="action-line">✓ Check competitor pricing</p>
        <p className="action-line">✓ Review selling price</p>
        <button className="done-button" onClick={() => setView("insights")}>
          Mark as Done
        </button>
      </div>
    );
  return (
    <div className="ai-view">
      <div className="dashboard-heading">
        <h1>AI Insights</h1>
        <p>Smart recommendations for your business</p>
      </div>
      <div className="insight-card">
        <b>
          Revenue increased, but
          <br />
          profit growth is slowing.
        </b>
        <p>
          Your revenue increased 12.47%. While profit increased only 52%,
          costs are growing faster than your sales.
        </p>
        <button onClick={() => setView("detail")}>View Detail</button>
      </div>
      <b className="ai-section-title">Other Insights</b>
      <button className="insight-row" onClick={() => setView("detail")}>
        ☕{" "}
        <span>
          Latte has a low profit margin
          <br />
          <small>compared to other products</small>
        </span>
        ›
      </button>
      <button className="insight-row" onClick={() => setView("chat")}>
        ◷{" "}
        <span>
          Monday sales are
          <br />
          <small>lower than average</small>
        </span>
        ›
      </button>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="reports-view">
      <div className="dashboard-heading">
        <h1>Business Report</h1>
        <p>Summary</p>
      </div>
      <div className="report-metrics">
        {[
          ["Revenue", "$5,240"],
          ["Cost", "$4,200"],
          ["Profit", "$1,020"],
          ["Profit Margin", "19.5%"],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
      <div className="report-highlights">
        <div>
          <small>Best Day</small>
          <b>Saturday</b>
          <em>$620</em>
        </div>
        <div>
          <small>Most Orders</small>
          <b>Monday</b>
          <em>58</em>
        </div>
      </div>
      <div className="report-summary">
        <b>AI Summary</b>
        <p>
          Latte is one of your popular products, but its profit margin is
          lower than your average.
        </p>
        <button onClick={() => window.alert("Report details are ready.")}>
          View Detail
        </button>
      </div>
      <button
        className="download-button"
        onClick={() => window.alert("Your PDF report is being prepared.")}
      >
        Download PDF
      </button>
    </div>
  );
}

function AccountSettingsView({ onBack }) {
  return (
    <div className="account-settings-view">
      <button className="profile-back" type="button" onClick={onBack}>
        ‹
      </button>
      <b className="settings-title">Account</b>
      <div className="settings-card compact-settings">
        <button>
          ♙ Personal Information <b>›</b>
        </button>
        <button>
          ⌁ Change Password <b>›</b>
        </button>
      </div>
      <b className="settings-title">Notifications</b>
      <div className="settings-card compact-settings">
        <button>
          ♧ Push Notifications <i>●</i>
        </button>
        <button>
          ✉ Email Notification <i>●</i>
        </button>
      </div>
      <b className="settings-title">Data</b>
      <div className="settings-card compact-settings">
        <button>
          ♧ Export Data <b>›</b>
        </button>
        <button>
          ♧ Delete Data <b>›</b>
        </button>
      </div>
      <b className="settings-title">Privacy &amp; Security</b>
      <div className="settings-card compact-settings">
        <button>
          ♧ Privacy Policy <b>›</b>
        </button>
        <button>
          ♧ Terms &amp; Conditions <b>›</b>
        </button>
      </div>
      <button className="logout-button">⇥ Logout</button>
    </div>
  );
}

function MoreProfileView() {
  const [view, setView] = useState("profile");
  if (view === "settings") return <AccountSettingsView onBack={() => setView("profile")} />;
  return (
    <div className="more-profile-view">
      <button className="profile-back" type="button">
        ‹
      </button>
      <div className="dashboard-heading">
        <h1>Business Profile</h1>
      </div>
      <div className="profile-header">
        <span className="profile-avatar">☕</span>
        <div>
          <b>Sokha Coffee</b>
          <small>Coffee Shop</small>
        </div>
        <button type="button" onClick={() => setView("settings")}>
          Edit
        </button>
      </div>
      <b className="settings-title">Business Information</b>
      <div className="settings-card">
        {[
          ["⌖", "Location", "Phnom Penh, Cambodia"],
          ["♙", "Employees", "4-20"],
          ["◷", "Years in Operation", "2 years"],
          ["$", "Monthly Revenue", "$2,000 - $5,000"],
        ].map(([icon, label, value]) => (
          <div className="setting-row" key={label}>
            <span>{icon}</span>
            <label>
              {label}
              <small>{value}</small>
            </label>
          </div>
        ))}
      </div>
      <b className="settings-title">Business Goals</b>
      <div className="goal-pills">
        <span>Increase Profit</span>
        <span>Improve Marketing</span>
        <span>Understand My Products</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadStep, setUploadStep] = useState("upload");
  return (
    <main className="onboarding-shell dashboard-shell">
      <section className="phone-screen dashboard-screen" aria-label="BizLens dashboard">
        <div className="status-bar">
          <span>9:41</span>
          <span className="status-icons">
            <span>◢</span>
            <span>◠</span>
            <span>▱</span>
          </span>
        </div>
        <div className="dashboard-content">
          {activeTab === 0 ? (
            uploadStep === "complete" ? (
              <DashboardHome />
            ) : uploadStep === "preview" ? (
              <PreviewView onImport={() => setUploadStep("complete")} />
            ) : (
              <UploadView onUploaded={() => setUploadStep("preview")} />
            )
          ) : activeTab === 1 ? (
            <AnalyticsView />
          ) : activeTab === 2 ? (
            <AIView />
          ) : activeTab === 3 ? (
            <ReportsView />
          ) : (
            <MoreProfileView />
          )}
        </div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={activeTab === index ? "nav-item active" : "nav-item"}
              onClick={() => setActiveTab(index)}
            >
              <span>{["⌂", "⌁", "✦", "▤", "•••"][index]}</span>
              {tab}
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}
