// src/components/dashboard/DashboardLayout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import HomeSection from "./sections/HomeSection";
import UploadSection from "./sections/UploadSection";
import AnalysisSection from "./sections/AnalysisSection";
import VisualizationSection from "./sections/VisualizationSection";
import ProfileSection from "./sections/ProfileSection";
import Notification from "./common/Notification";
import HistorySection from "./sections/HistorySection";

export function DashboardLayout() {
  const [activeSection, setActiveSection] = useState("home");
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-6 overflow-auto">
        {activeSection === "home" && (
          <HomeSection setActiveSection={setActiveSection} />
        )}
        {activeSection === "upload" && (
          <UploadSection showNotification={showNotification} />
        )}
        {activeSection === "analysis" && (
          <AnalysisSection showNotification={showNotification} />
        )}
        {activeSection === "visualization" && (
          <VisualizationSection showNotification={showNotification} />
        )}
        {activeSection === "profile" && (
          <ProfileSection showNotification={showNotification} />
        )}
        {activeSection === "history" && (
          <HistorySection showNotification={showNotification} />
        )}
        {notification && <Notification message={notification} />}
      </main>
    </div>
  );
}
