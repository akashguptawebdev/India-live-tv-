import React, { useState, useEffect, useRef } from "react";
import { iptvChannelslist } from "../stream/indian-list";
import Sidebar from "./Sidebar";
import "./PlayerScreen.css";
import { Menu } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { ListVideo } from 'lucide-react';
function PlayerScreen() {
    const videoRef = useRef(null);
    const collapseTimeoutRef = useRef(null);
    const rafRef = useRef(null);
    const {
        activeChannel,
        setActiveChannel,
        activeStream,
        setActiveStream,
    } = useAppContext();

    const [sidebarWidth, setSidebarWidth] = useState(100);
    const [isResizing, setIsResizing] = useState(false);
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        language: [],
        channelType: [],
    });

    const isMobile = window.innerWidth <= 600;
    const minWidthSideBar = 100;
    const maxWidthSideBar = 280;

    /* ================= Sidebar Resize ================= */
    const startResize = () => setIsResizing(true);
    const stopResize = () => setIsResizing(false);

    const resize = (e) => {
        if (!isResizing || rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            const newWidth = e.clientX;
            if (newWidth >= 200 && newWidth <= 420) {
                setSidebarWidth(newWidth);
            }
            rafRef.current = null;
        });
    };

    useEffect(() => {
        window.addEventListener("pointermove", resize);
        window.addEventListener("pointerup", stopResize);
        return () => {
            window.removeEventListener("pointermove", resize);
            window.removeEventListener("pointerup", stopResize);
        };
    }, [isResizing]);

    /* ================= Sidebar Hover ================= */
    const handleSidebarMouseEnter = () => {
        if (collapseTimeoutRef.current) clearTimeout(collapseTimeoutRef.current);
        setSidebarWidth(maxWidthSideBar);
        setIsSideBarExpanded(true);
    };

    const handleSidebarMouseLeave = () => {
        collapseTimeoutRef.current = setTimeout(() => {
            setSidebarWidth(minWidthSideBar);
            setIsSideBarExpanded(false);
        }, 2000);
    };

    /* ================= Channel Select ================= */
    const handleChannelSelect = (channel) => {
        setActiveChannel(channel);
        setActiveStream(channel.streams?.[0]);
        if (isMobile) setIsMobileSidebarOpen(false);
    };

    // =================== Fullscreen Toggle ===================
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === "f" && videoRef.current) {
                if (!document.fullscreenElement) {
                    videoRef.current.requestFullscreen().catch((err) => {
                        console.log("Fullscreen request failed:", err);
                    });
                } else {
                    document.exitFullscreen();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    /* ================= Filter ================= */
    const filteredChannels = iptvChannelslist.filter((channel) => {
        const matchesSearch = channel.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesLanguage =
            filters.language.length === 0 ||
            filters.language.includes(channel.language);

        const matchesType =
            filters.channelType.length === 0 ||
            filters.channelType.includes(channel.channelType);

        return matchesSearch && matchesLanguage && matchesType;
    });

    return (
        <div className="player-screen">
            {/* Mobile Hamburger */}
            {isMobile && !isMobileSidebarOpen && (
                <button
                    className="hamburger-btn"
                    onClick={() => setIsMobileSidebarOpen(true)}
                >
                    <Menu size={22} />
                </button>
            )}

            {/* Sidebar */}
            {(isMobile ? isMobileSidebarOpen : true) && activeChannel && (
                <Sidebar
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    isSideBarExpanded={isMobile ? true : isSideBarExpanded}
                    width={isMobile ? maxWidthSideBar : sidebarWidth}
                    startResize={startResize}
                    channels={filteredChannels}
                    activeChannel={activeChannel}
                    onSelect={handleChannelSelect}
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    filters={filters}
                    onFilterChange={setFilters}
                    onMouseEnter={handleSidebarMouseEnter}
                    onMouseLeave={handleSidebarMouseLeave}
                />
            )}



            {/* Overlay */}
            {isMobile && !isMobileSidebarOpen && (
                <div
                    className="mobile-sidebar-overlay"
                    onClick={() => setIsMobileSidebarOpen(true)}> <ListVideo size={22}/></div>

                    
            )}

            {/* ================= MAIN CONTENT ================= */}
            <div className="player-section">
                {!activeChannel ? (
                    <>
                        <h2 className="main-screen-title">Channels</h2>

                        {/* 🔥 Channel Grid View */}
                        <div className="channel-grid">
                            {filteredChannels.map((channel) => (
                                <div
                                    key={channel.tvgId}
                                    className="channel-card"
                                    onClick={() => handleChannelSelect(channel)}
                                >
                                    <img
                                        src={channel.logo || "https://via.placeholder.com/80"}
                                        alt={channel.name}
                                    />
                                    <p>{channel.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h2>{activeChannel.name}</h2>

                        {/* Stream Selector */}
                        <div style={{ marginBottom: "10px" }}>
                            {activeChannel.streams.map((stream) => (
                                <button
                                    key={stream.quality}
                                    onClick={() => setActiveStream(stream)}
                                    className={`stream-btn ${activeStream?.quality === stream.quality
                                            ? "active"
                                            : "inactive"
                                        }`}
                                >
                                    {stream.quality}
                                </button>
                            ))}
                        </div>

                        {/* Video */}
                        {activeStream && (
                            <video
                                ref={videoRef}
                                key={activeStream.url}
                                src={activeStream.url}
                                controls
                                autoPlay
                                className="video-player"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default PlayerScreen;
