
import React, { useState } from "react";
import {
  Activity, LayoutDashboard, CandlestickChart,
  Wallet, History, Users, Settings, Headphones,
  Bell, Search, Menu, ChevronDown, ArrowUpRight,
  ArrowDownRight, ShieldCheck, Lock, TrendingUp,
  Clock, Star
} from "lucide-react";

const assets = [
  { name: "EUR / USD", type: "Forex", price: "1.08425", change: "+0.42%", positive: true },
  { name: "GBP / USD", type: "Forex", price: "1.27180", change: "-0.18%", positive: false },
  { name: "BTC / USD", type: "Crypto", price: "67,420.50", change: "+2.35%", positive: true },
  { name: "ETH / USD", type: "Crypto", price: "3,520.80", change: "+1.12%", positive: true },
  { name: "GOLD", type: "Commodity", price: "2,342.60", change: "-0.31%", positive: false },
  { name: "NASDAQ", type: "Index", price: "18,240.20", change: "+0.76%", positive: true }
];

export default function App() {
  const [account, setAccount] = useState("demo");
  const [active, setActive] = useState("Dashboard");
  const [amount, setAmount] = useState(100);
  const [selected, setSelected] = useState(assets[0]);
  const [trades, setTrades] = useState([]);
  const [notice, setNotice] = useState("");

  const demoBalance = 10000;
  const locked = account === "real";

  function placeDemoTrade(direction) {
    if (locked) {
      setNotice("Real account is currently locked.");
      return;
    }
    if (amount <= 0 || amount > demoBalance) {
      setNotice("Enter a valid demo trade amount.");
      return;
    }

    const trade = {
      id: Date.now(),
      asset: selected.name,
      direction,
      amount,
      time: new Date().toLocaleTimeString(),
      status: "SIMULATED"
    };

    setTrades(previous => [trade, ...previous]);
    setNotice("Demo trade recorded successfully.");
  }

  const nav = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Trading", icon: CandlestickChart },
    { name: "Wallet", icon: Wallet },
    { name: "History", icon: History },
    { name: "Referrals", icon: Users },
    { name: "Support", icon: Headphones },
    { name: "Settings", icon: Settings }
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Activity size={23}/></div>
          <div>
            <h2>GRIND<span>TRADE</span></h2>
            <small>TRADING TERMINAL</small>
          </div>
        </div>

        <div className="nav-label">MAIN MENU</div>
        {nav.map(item => (
          <button
            key={item.name}
            className={`nav-item ${active === item.name ? "active" : ""}`}
            onClick={() => setActive(item.name)}
          >
            <item.icon size={18}/>
            <span>{item.name}</span>
          </button>
        ))}

        <div className="sidebar-bottom">
          <ShieldCheck size={19}/>
          <div>
            <b>Account Security</b>
            <small>Security settings</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu"><Menu/></button>
          <div className="breadcrumb">Workspace / <b>{active}</b></div>
          <div className="top-actions">
            <button className="icon-btn"><Search size={19}/></button>
            <button className="icon-btn"><Bell size={19}/></button>
            <div className="avatar">GT</div>
          </div>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">WELCOME TO GRIND TRADE</div>
              <h1>{active === "Dashboard" ? "Trading Dashboard" : active}</h1>
              <p>Your multi-asset trading workspace.</p>
            </div>

            <div className="account-switch">
              <button
                className={account === "demo" ? "selected" : ""}
                onClick={() => {
                  setAccount("demo");
                  setNotice("");
                }}
              >Demo</button>
              <button
                className={account === "real" ? "selected" : ""}
                onClick={() => {
                  setAccount("real");
                  setNotice("Real account is locked pending authorization.");
                }}
              >Real <Lock size={12}/></button>
            </div>
          </div>

          {notice && <div className="notice">{notice}</div>}

          {active === "Dashboard" || active === "Trading" ? (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <span>ACCOUNT BALANCE</span>
                  <h2>{account === "demo" ? "$10,000.00" : "Locked"}</h2>
                  <small><Activity size={14}/> Virtual account balance</small>
                </div>
                <div className="stat-card">
                  <span>TOTAL DEMO TRADES</span>
                  <h2>{trades.length}</h2>
                  <small>Recorded in this session</small>
                </div>
                <div className="stat-card">
                  <span>MARKET WATCH</span>
                  <h2>06 Assets</h2>
                  <small><TrendingUp size={14}/> Sample market display</small>
                </div>
              </div>

              <div className="section-heading">
                <div>
                  <h2>Market Overview</h2>
                  <p>Illustrative prices, not live market quotes.</p>
                </div>
                <button className="filter-btn">All Assets <ChevronDown size={15}/></button>
              </div>

              <div className="market-layout">
                <div className="panel market-panel">
                  <div className="panel-heading">
                    <h3>Popular Assets</h3>
                    <span>SIMULATED DATA</span>
                  </div>

                  {assets.map(asset => (
                    <button
                      className={`asset-row ${selected.name === asset.name ? "asset-selected" : ""}`}
                      key={asset.name}
                      onClick={() => setSelected(asset)}
                    >
                      <div className="asset-symbol">
                        <span>{asset.name.slice(0, 1)}</span>
                        <div>
                          <b>{asset.name}</b>
                          <small>{asset.type}</small>
                        </div>
                      </div>
                      <div className="asset-price">
                        <b>{asset.price}</b>
                        <small className={asset.positive ? "positive" : "negative"}>
                          {asset.change}
                        </small>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="panel trade-panel">
                  <div className="panel-heading">
                    <h3>Trade Simulator</h3>
                    <Star size={17} className="gold-icon"/>
                  </div>

                  <div className="selected-asset">
                    <span>SELECTED ASSET</span>
                    <h2>{selected.name}</h2>
                    <p>{selected.type} · Sample price</p>
                    <h2 className="selected-price">{selected.price}</h2>
                  </div>

                  <div className="chart-placeholder">
                    <CandlestickChart size={35}/>
                    <b>Chart Integration</b>
                    <small>Historical and authorized market data will be connected here.</small>
                  </div>

                  <label>Virtual trade amount</label>
                  <div className="amount-input">
                    <span>$</span>
                    <input
                      type="number"
                      min="1"
                      value={amount}
                      onChange={e => setAmount(Number(e.target.value))}
                    />
                  </div>

                  <div className="quick-amounts">
                    {[50, 100, 250, 500].map(n => (
                      <button key={n} onClick={() => setAmount(n)}>${n}</button>
                    ))}
                  </div>

                  <div className="trade-buttons">
                    <button onClick={() => placeDemoTrade("UP")}>
                      <ArrowUpRight size={18}/> UP
                    </button>
                    <button onClick={() => placeDemoTrade("DOWN")}>
                      <ArrowDownRight size={18}/> DOWN
                    </button>
                  </div>

                  <div className="simulation-note">
                    <ShieldCheck size={15}/>
                    Simulation only. No real-money orders.
                  </div>
                </div>
              </div>

              <div className="panel history-panel">
                <div className="panel-heading">
                  <h3>Recent Demo Activity</h3>
                  <span>{trades.length} RECORDS</span>
                </div>
                {trades.length === 0 ? (
                  <div className="empty-state">
                    <Clock size={25}/>
                    <p>No demo trades recorded yet.</p>
                  </div>
                ) : trades.map(trade => (
                  <div className="history-row" key={trade.id}>
                    <b>{trade.asset}</b>
                    <span>{trade.direction}</span>
                    <span>${trade.amount}</span>
                    <small>{trade.time}</small>
                    <small>{trade.status}</small>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="panel coming-panel">
              <Lock size={32}/>
              <h2>{active} Module</h2>
              <p>This module will be connected to the secure backend in its development phase.</p>
              <small>Real-money financial functions are not enabled.</small>
            </div>
          )}

          <footer>
            © 2026 GRIND TRADE · Prototype Version 1.0
            <span>Demo simulation · Not a live broker</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
