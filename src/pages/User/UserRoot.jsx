import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../../components/appSidebar";
import { SidebarProvider } from "../../components/ui/sidebar";
import { useLanguage } from "../../context/LanguageContext";
import UserHeader from "./UserHeader";

export default function UserRoot() {
  const { language } = useLanguage();

  return (
    <SidebarProvider>
      {(language === "en" || language === "fr") && <AppSidebar />}
      <main className="w-full">
        <UserHeader />
        <div className="p-5">
          <Outlet />
        </div>
      </main>
      {language === "ar" && <AppSidebar />}
    </SidebarProvider>
  );
}
