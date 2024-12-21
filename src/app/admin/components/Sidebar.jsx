export default function Sidebar({ activeSection, setActiveSection }) {
    const sections = ["pets", "users", "questions", "adoptions"];
  
    return (
      <div className="w-1/5 bg-[#A888B5] text-white">
        <div className="p-6 text-2xl font-bold">Admin Dashboard</div>
        <nav className="mt-6">
          {sections.map((section) => (
            <button
              key={section}
              className={`block w-full text-left px-6 py-3 hover:bg-[#FFC585] ${
                activeSection === section ? "bg-[#FFC585]" : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)} Management
            </button>
          ))}
        </nav>
      </div>
    );
  }
  