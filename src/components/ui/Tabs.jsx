export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => onChange(tab.toLowerCase())}
          className={`
            px-5 py-2.5 rounded-full font-medium transition-all duration-300 border backdrop-blur-md
            ${activeTab === tab.toLowerCase()
              ? 'bg-white/20 text-white border-white/40 shadow-lg shadow-[#007AFF]/20'
              : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
