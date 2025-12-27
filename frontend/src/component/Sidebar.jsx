import SidebarHeader from "./SidebarHeader";
import "./Sidebar.css";

const Sidebar = ({
  width,
  startResize,
  channels,
  activeChannel,
  onSelect,
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  onMouseEnter,
  onMouseLeave,
  isSideBarExpanded,
  setIsMobileSidebarOpen,
  isMobileSidebarOpen
}) => {
  const isMobile = window.innerWidth <= 600;

  return (
    <aside
      className="sidebar"
      style={{
        width,
        transition: "width 0.3s ease",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
     {(isSideBarExpanded || isMobile )&& <SidebarHeader
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        isMobile={isMobile}
        searchTerm={searchTerm}
        onSearch={onSearch}
        filters={filters}
        onFilterChange={onFilterChange}
      />}

      <div className="channel-list">
        {channels.map((channel) => (
          <div
            key={channel.tvgId}
            className={`channel-item ${
              activeChannel?.tvgId === channel.tvgId ? "active" : ""
            }`}
            onClick={() => onSelect(channel)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 8px",
            }}
          >
            <img
              src={channel.logo || "https://via.placeholder.com/40"}
              className="channel-logo"
              alt={channel.name}
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            
              <p className="channel-name" style={{ whiteSpace: "nowrap" }}>
                {channel.name}
              </p>
            
          </div>
        ))}
      </div>

      <div
        className="resize-handle"
        onMouseDown={startResize}
        style={{ cursor: "ew-resize" }}
      />
    </aside>
  );
};

export default Sidebar;
