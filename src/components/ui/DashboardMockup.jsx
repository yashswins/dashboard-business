'use client';

// SVG-based dashboard mockup that looks like a macOS app window
export default function DashboardMockup({ variant = 'analytics', className = '' }) {
  const mockups = {
    analytics: (
      <svg viewBox="0 0 800 500" className={`w-full h-auto ${className}`}>
        {/* Window Frame */}
        <defs>
          <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f7" />
            <stop offset="100%" stopColor="#e8e8ed" />
          </linearGradient>
          <linearGradient id="chartGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#007AFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#007AFF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="chartGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34C759" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34C759" stopOpacity="0.2" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="20" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Window */}
        <rect x="20" y="20" width="760" height="460" rx="12" fill="url(#windowGradient)" filter="url(#shadow)" />

        {/* Title Bar */}
        <rect x="20" y="20" width="760" height="40" rx="12" fill="#e8e8ed" />
        <rect x="20" y="48" width="760" height="12" fill="#e8e8ed" />

        {/* Traffic Lights */}
        <circle cx="45" cy="40" r="6" fill="#FF5F57" />
        <circle cx="65" cy="40" r="6" fill="#FEBC2E" />
        <circle cx="85" cy="40" r="6" fill="#28C840" />

        {/* Window Title */}
        <text x="400" y="45" textAnchor="middle" fill="#1D1D1F" fontSize="13" fontWeight="500">Analytics Dashboard</text>

        {/* Sidebar */}
        <rect x="20" y="60" width="180" height="420" fill="#f0f0f5" />

        {/* Sidebar Items */}
        <rect x="35" y="80" width="150" height="32" rx="6" fill="#007AFF" fillOpacity="0.1" />
        <circle cx="50" cy="96" r="4" fill="#007AFF" />
        <rect x="62" y="91" width="80" height="10" rx="2" fill="#007AFF" />

        <circle cx="50" cy="132" r="4" fill="#86868B" />
        <rect x="62" y="127" width="70" height="10" rx="2" fill="#C7C7CC" />

        <circle cx="50" cy="164" r="4" fill="#86868B" />
        <rect x="62" y="159" width="90" height="10" rx="2" fill="#C7C7CC" />

        <circle cx="50" cy="196" r="4" fill="#86868B" />
        <rect x="62" y="191" width="60" height="10" rx="2" fill="#C7C7CC" />

        {/* Main Content Area */}
        <rect x="200" y="60" width="580" height="420" fill="#ffffff" />

        {/* KPI Cards Row */}
        <rect x="220" y="80" width="130" height="70" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="235" y="95" width="50" height="8" rx="2" fill="#86868B" />
        <text x="235" y="130" fill="#1D1D1F" fontSize="20" fontWeight="600">$125K</text>

        <rect x="365" y="80" width="130" height="70" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="380" y="95" width="60" height="8" rx="2" fill="#86868B" />
        <text x="380" y="130" fill="#1D1D1F" fontSize="20" fontWeight="600">2,847</text>

        <rect x="510" y="80" width="130" height="70" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="525" y="95" width="45" height="8" rx="2" fill="#86868B" />
        <text x="525" y="130" fill="#34C759" fontSize="20" fontWeight="600">+18%</text>

        <rect x="655" y="80" width="105" height="70" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="670" y="95" width="55" height="8" rx="2" fill="#86868B" />
        <text x="670" y="130" fill="#1D1D1F" fontSize="20" fontWeight="600">94%</text>

        {/* Main Chart */}
        <rect x="220" y="170" width="380" height="200" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="235" y="185" width="100" height="10" rx="2" fill="#1D1D1F" />

        {/* Chart Area Fill */}
        <path d="M250 340 L290 310 L330 325 L370 280 L410 290 L450 250 L490 270 L530 220 L570 240 L570 350 L250 350 Z" fill="url(#chartGradient1)" />
        <path d="M250 340 L290 310 L330 325 L370 280 L410 290 L450 250 L490 270 L530 220 L570 240" fill="none" stroke="#007AFF" strokeWidth="2" />

        {/* Chart dots */}
        <circle cx="250" cy="340" r="4" fill="#007AFF" />
        <circle cx="290" cy="310" r="4" fill="#007AFF" />
        <circle cx="330" cy="325" r="4" fill="#007AFF" />
        <circle cx="370" cy="280" r="4" fill="#007AFF" />
        <circle cx="410" cy="290" r="4" fill="#007AFF" />
        <circle cx="450" cy="250" r="4" fill="#007AFF" />
        <circle cx="490" cy="270" r="4" fill="#007AFF" />
        <circle cx="530" cy="220" r="4" fill="#007AFF" />
        <circle cx="570" cy="240" r="4" fill="#007AFF" />

        {/* Pie Chart */}
        <rect x="615" y="170" width="145" height="200" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="630" y="185" width="80" height="10" rx="2" fill="#1D1D1F" />

        <circle cx="687" cy="280" r="50" fill="none" stroke="#007AFF" strokeWidth="20" strokeDasharray="110 204" />
        <circle cx="687" cy="280" r="50" fill="none" stroke="#34C759" strokeWidth="20" strokeDasharray="60 254" strokeDashoffset="-110" />
        <circle cx="687" cy="280" r="50" fill="none" stroke="#FF9500" strokeWidth="20" strokeDasharray="34 280" strokeDashoffset="-170" />

        {/* Bottom Bar Charts */}
        <rect x="220" y="385" width="250" height="85" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="235" y="400" width="90" height="8" rx="2" fill="#1D1D1F" />

        <rect x="245" y="425" width="25" height="35" rx="3" fill="#007AFF" />
        <rect x="280" y="435" width="25" height="25" rx="3" fill="#007AFF" fillOpacity="0.7" />
        <rect x="315" y="420" width="25" height="40" rx="3" fill="#007AFF" />
        <rect x="350" y="440" width="25" height="20" rx="3" fill="#007AFF" fillOpacity="0.7" />
        <rect x="385" y="428" width="25" height="32" rx="3" fill="#007AFF" />
        <rect x="420" y="415" width="25" height="45" rx="3" fill="#007AFF" />

        {/* Stats Card */}
        <rect x="485" y="385" width="275" height="85" rx="8" fill="#f8f8fa" stroke="#e5e5ea" />
        <rect x="500" y="400" width="70" height="8" rx="2" fill="#1D1D1F" />

        <rect x="500" y="425" width="100" height="6" rx="2" fill="#e5e5ea" />
        <rect x="500" y="425" width="75" height="6" rx="2" fill="#34C759" />

        <rect x="500" y="445" width="100" height="6" rx="2" fill="#e5e5ea" />
        <rect x="500" y="445" width="60" height="6" rx="2" fill="#007AFF" />

        <rect x="620" y="420" width="60" height="40" rx="6" fill="#34C759" fillOpacity="0.1" />
        <text x="650" y="447" textAnchor="middle" fill="#34C759" fontSize="16" fontWeight="600">+24%</text>

        <rect x="690" y="420" width="60" height="40" rx="6" fill="#007AFF" fillOpacity="0.1" />
        <text x="720" y="447" textAnchor="middle" fill="#007AFF" fontSize="16" fontWeight="600">847</text>
      </svg>
    ),
    sales: (
      <svg viewBox="0 0 800 500" className={`w-full h-auto ${className}`}>
        <defs>
          <linearGradient id="windowGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#16213e" />
          </linearGradient>
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a4a" />
            <stop offset="100%" stopColor="#1e1e3f" />
          </linearGradient>
          <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="20" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Dark Window */}
        <rect x="20" y="20" width="760" height="460" rx="12" fill="url(#windowGradient2)" filter="url(#shadow2)" />

        {/* Title Bar */}
        <rect x="20" y="20" width="760" height="40" rx="12" fill="#0d0d1a" />
        <rect x="20" y="48" width="760" height="12" fill="#0d0d1a" />

        {/* Traffic Lights */}
        <circle cx="45" cy="40" r="6" fill="#FF5F57" />
        <circle cx="65" cy="40" r="6" fill="#FEBC2E" />
        <circle cx="85" cy="40" r="6" fill="#28C840" />

        <text x="400" y="45" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="500">Sales Performance</text>

        {/* KPI Cards */}
        <rect x="40" y="80" width="170" height="90" rx="10" fill="url(#cardGradient)" />
        <text x="55" y="105" fill="#8b8ba7" fontSize="11">TOTAL REVENUE</text>
        <text x="55" y="140" fill="#ffffff" fontSize="28" fontWeight="600">$2M</text>
        <text x="55" y="158" fill="#34C759" fontSize="12">+13% from last month</text>

        <rect x="225" y="80" width="170" height="90" rx="10" fill="url(#cardGradient)" />
        <text x="240" y="105" fill="#8b8ba7" fontSize="11">NEW CUSTOMERS</text>
        <text x="240" y="140" fill="#ffffff" fontSize="28" fontWeight="600">1,247</text>
        <text x="240" y="158" fill="#34C759" fontSize="12">+8% from last month</text>

        <rect x="410" y="80" width="170" height="90" rx="10" fill="url(#cardGradient)" />
        <text x="425" y="105" fill="#8b8ba7" fontSize="11">CONVERSION RATE</text>
        <text x="425" y="140" fill="#ffffff" fontSize="28" fontWeight="600">4%</text>
        <text x="425" y="158" fill="#FF9500" fontSize="12">-1% from last month</text>

        <rect x="595" y="80" width="165" height="90" rx="10" fill="url(#cardGradient)" />
        <text x="610" y="105" fill="#8b8ba7" fontSize="11">AVG ORDER VALUE</text>
        <text x="610" y="140" fill="#ffffff" fontSize="28" fontWeight="600">$186</text>
        <text x="610" y="158" fill="#34C759" fontSize="12">+6% from last month</text>

        {/* Main Chart Area */}
        <rect x="40" y="190" width="480" height="270" rx="10" fill="url(#cardGradient)" />
        <text x="60" y="220" fill="#ffffff" fontSize="14" fontWeight="500">Revenue Over Time</text>

        {/* Area chart */}
        <path d="M70 420 L130 380 L190 390 L250 350 L310 360 L370 310 L430 330 L490 280 L490 430 L70 430 Z" fill="#007AFF" fillOpacity="0.2" />
        <path d="M70 420 L130 380 L190 390 L250 350 L310 360 L370 310 L430 330 L490 280" fill="none" stroke="#007AFF" strokeWidth="2" />

        {/* Second line */}
        <path d="M70 400 L130 410 L190 380 L250 390 L310 370 L370 380 L430 350 L490 340" fill="none" stroke="#34C759" strokeWidth="2" strokeDasharray="5,5" />

        {/* Right side charts */}
        <rect x="540" y="190" width="220" height="125" rx="10" fill="url(#cardGradient)" />
        <text x="560" y="220" fill="#ffffff" fontSize="14" fontWeight="500">Sales by Region</text>

        {/* Horizontal bars */}
        <rect x="560" y="240" width="120" height="12" rx="3" fill="#007AFF" />
        <text x="690" y="250" fill="#ffffff" fontSize="11">North $840K</text>

        <rect x="560" y="260" width="90" height="12" rx="3" fill="#34C759" />
        <text x="660" y="270" fill="#ffffff" fontSize="11">South $620K</text>

        <rect x="560" y="280" width="70" height="12" rx="3" fill="#FF9500" />
        <text x="640" y="290" fill="#ffffff" fontSize="11">East $480K</text>

        <rect x="540" y="335" width="220" height="125" rx="10" fill="url(#cardGradient)" />
        <text x="560" y="365" fill="#ffffff" fontSize="14" fontWeight="500">Top Products</text>

        <rect x="560" y="385" width="180" height="8" rx="2" fill="#2a2a4a" />
        <rect x="560" y="385" width="160" height="8" rx="2" fill="#007AFF" />
        <text x="560" y="408" fill="#8b8ba7" fontSize="10">Product A - $320K</text>

        <rect x="560" y="420" width="180" height="8" rx="2" fill="#2a2a4a" />
        <rect x="560" y="420" width="120" height="8" rx="2" fill="#34C759" />
        <text x="560" y="443" fill="#8b8ba7" fontSize="10">Product B - $240K</text>
      </svg>
    ),
    operations: (
      <svg viewBox="0 0 800 500" className={`w-full h-auto ${className}`}>
        <defs>
          <linearGradient id="windowGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f5f5f7" />
          </linearGradient>
          <filter id="shadow3" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Window */}
        <rect x="20" y="20" width="760" height="460" rx="12" fill="url(#windowGradient3)" filter="url(#shadow3)" />

        {/* Title Bar */}
        <rect x="20" y="20" width="760" height="40" rx="12" fill="#f0f0f5" />
        <rect x="20" y="48" width="760" height="12" fill="#f0f0f5" />

        <circle cx="45" cy="40" r="6" fill="#FF5F57" />
        <circle cx="65" cy="40" r="6" fill="#FEBC2E" />
        <circle cx="85" cy="40" r="6" fill="#28C840" />

        <text x="400" y="45" textAnchor="middle" fill="#1D1D1F" fontSize="13" fontWeight="500">Operations Monitor</text>

        {/* Status indicator cards */}
        <rect x="40" y="80" width="230" height="100" rx="12" fill="#ffffff" stroke="#e5e5ea" />
        <circle cx="65" cy="105" r="8" fill="#34C759" />
        <text x="80" y="110" fill="#1D1D1F" fontSize="14" fontWeight="500">System Health</text>
        <text x="55" y="145" fill="#1D1D1F" fontSize="32" fontWeight="600">99%</text>
        <text x="55" y="165" fill="#34C759" fontSize="12">All systems operational</text>

        <rect x="285" y="80" width="230" height="100" rx="12" fill="#ffffff" stroke="#e5e5ea" />
        <circle cx="310" cy="105" r="8" fill="#007AFF" />
        <text x="325" y="110" fill="#1D1D1F" fontSize="14" fontWeight="500">Active Tasks</text>
        <text x="300" y="145" fill="#1D1D1F" fontSize="32" fontWeight="600">2,847</text>
        <text x="300" y="165" fill="#86868B" fontSize="12">Processing normally</text>

        <rect x="530" y="80" width="230" height="100" rx="12" fill="#ffffff" stroke="#e5e5ea" />
        <circle cx="555" cy="105" r="8" fill="#FF9500" />
        <text x="570" y="110" fill="#1D1D1F" fontSize="14" fontWeight="500">Alerts</text>
        <text x="545" y="145" fill="#1D1D1F" fontSize="32" fontWeight="600">3</text>
        <text x="545" y="165" fill="#FF9500" fontSize="12">Requires attention</text>

        {/* Main monitoring area */}
        <rect x="40" y="200" width="480" height="260" rx="12" fill="#ffffff" stroke="#e5e5ea" />
        <text x="60" y="230" fill="#1D1D1F" fontSize="14" fontWeight="500">Real-time Performance</text>

        {/* Animated-looking metrics */}
        <rect x="60" y="260" width="440" height="40" rx="6" fill="#f8f8fa" />
        <rect x="70" y="270" width="80" height="20" rx="4" fill="#34C759" fillOpacity="0.2" />
        <text x="80" y="285" fill="#34C759" fontSize="11" fontWeight="500">CPU: 45%</text>
        <rect x="160" y="270" width="100" height="20" rx="4" fill="#007AFF" fillOpacity="0.2" />
        <text x="170" y="285" fill="#007AFF" fontSize="11" fontWeight="500">Memory: 62%</text>
        <rect x="270" y="270" width="90" height="20" rx="4" fill="#FF9500" fillOpacity="0.2" />
        <text x="280" y="285" fill="#FF9500" fontSize="11" fontWeight="500">Disk: 78%</text>
        <rect x="370" y="270" width="100" height="20" rx="4" fill="#34C759" fillOpacity="0.2" />
        <text x="380" y="285" fill="#34C759" fontSize="11" fontWeight="500">Network: 23%</text>

        {/* Line chart showing live data */}
        <path d="M60 380 Q100 360, 140 370 T220 350 T300 365 T380 340 T460 355 T490 330" fill="none" stroke="#007AFF" strokeWidth="2" />
        <path d="M60 400 Q100 390, 140 395 T220 385 T300 390 T380 375 T460 380 T490 370" fill="none" stroke="#34C759" strokeWidth="2" strokeDasharray="4,4" />

        {/* Right panel */}
        <rect x="540" y="200" width="220" height="260" rx="12" fill="#ffffff" stroke="#e5e5ea" />
        <text x="560" y="230" fill="#1D1D1F" fontSize="14" fontWeight="500">Recent Events</text>

        {/* Event items */}
        <rect x="555" y="250" width="190" height="45" rx="6" fill="#34C759" fillOpacity="0.1" />
        <circle cx="575" cy="272" r="6" fill="#34C759" />
        <text x="590" y="268" fill="#1D1D1F" fontSize="11" fontWeight="500">Backup Complete</text>
        <text x="590" y="282" fill="#86868B" fontSize="10">2 minutes ago</text>

        <rect x="555" y="305" width="190" height="45" rx="6" fill="#007AFF" fillOpacity="0.1" />
        <circle cx="575" cy="327" r="6" fill="#007AFF" />
        <text x="590" y="323" fill="#1D1D1F" fontSize="11" fontWeight="500">Deploy Successful</text>
        <text x="590" y="337" fill="#86868B" fontSize="10">15 minutes ago</text>

        <rect x="555" y="360" width="190" height="45" rx="6" fill="#FF9500" fillOpacity="0.1" />
        <circle cx="575" cy="382" r="6" fill="#FF9500" />
        <text x="590" y="378" fill="#1D1D1F" fontSize="11" fontWeight="500">High Memory Usage</text>
        <text x="590" y="392" fill="#86868B" fontSize="10">1 hour ago</text>

        <rect x="555" y="415" width="190" height="35" rx="6" fill="#f8f8fa" />
        <text x="650" y="437" textAnchor="middle" fill="#007AFF" fontSize="11" fontWeight="500">View All Events →</text>
      </svg>
    )
  };

  return mockups[variant] || mockups.analytics;
}
