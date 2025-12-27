import { createContext, useContext, useState } from "react";

// 1️⃣ Create Context
const AppContext = createContext(null);

// 2️⃣ Provider Component
export const AppProvider = ({ children }) => {
  // ===== Global States =====
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeStream, setActiveStream] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    language: [],
    channelType: [],
  });

  // ===== Values exposed to app =====
  const value = {
    activeChannel,
    setActiveChannel,
    activeStream,
    setActiveStream,

    isSidebarOpen,
    setIsSidebarOpen,
    isSidebarExpanded,
    setIsSidebarExpanded,

    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// 3️⃣ Custom Hook (BEST PRACTICE)
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
