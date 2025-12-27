import React, { useState, useEffect, useRef } from "react";
import "./SidebarHeader.css";
import { Funnel, X } from "lucide-react";

const LANGUAGES = ["hindi", "english", "tamil", "bangla", "telugu"];
const TYPES = ["sports","music", "news", "movie", "entertainment", "kids"];

const SidebarHeader = ({
    searchTerm,
    onSearch,
    filters,
    onFilterChange,
    isMobile,
    setIsMobileSidebarOpen,
    isMobileSidebarOpen,
}) => {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef(null);

    // Toggle filter value
    const toggleValue = (key, value) => {
        const current = filters[key];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        onFilterChange({ ...filters, [key]: updated });
    };

    // Clear filters
    const clearFilters = () => {
        onFilterChange({ language: [], channelType: [] });
    };

    // Close popover if click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="sidebar-header">
            {/* Search + Close Button */}
            <div className="search-close-wrapper">
                <input
                    type="text"
                    placeholder="Search channel..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Filter Button */}
            <button
                className="filter-btn"
                onClick={() => setOpen(!open)}
                title="Filters"
            >
                <Funnel size={18} />
            </button>

            {isMobile && isMobileSidebarOpen && (
                    <button
                        className="close-btn-hamburger"
                        onClick={() => setIsMobileSidebarOpen(false)}
                        title="Close Sidebar"
                    >
                        <X size={22} />
                    </button>
                )}

            {/* Filter Popover */}
            {open && (
                <div className="filter-popover" ref={popoverRef}>
                    <div className="filter-header">
                        <span>Filters</span>
                        <X size={18} onClick={() => setOpen(false)} className="popover-close" />
                    </div>

                    {/* Language */}
                    <div className="filter-section">
                        <p>Language</p>
                        <div className="filter-options">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang}
                                    className={`filter-chip ${filters.language.includes(lang) ? "active" : ""}`}
                                    onClick={() => toggleValue("language", lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Channel Type */}
                    <div className="filter-section">
                        <p>Channel Type</p>
                        <div className="filter-options">
                            {TYPES.map((type) => (
                                <button
                                    key={type}
                                    className={`filter-chip ${filters.channelType.includes(type) ? "active" : ""}`}
                                    onClick={() => toggleValue("channelType", type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="filter-actions">
                        <button className="clear" onClick={clearFilters}>
                            Clear
                        </button>
                        <button className="apply" onClick={() => setOpen(false)}>
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarHeader;
