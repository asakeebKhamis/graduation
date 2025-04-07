import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "../../components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { useLanguage } from "../../context/LanguageContext";
import SelectLanguage from "../../components/SelectLanguage";
import { SelectTheme } from "../../components/SelectTheme";
import { Plus, Search, Upload } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function DashboardLayout() {
  const { language } = useLanguage();

  return (
    <SidebarProvider>
      {language !== "ar" && <AppSidebar />}
      <main className="w-full">
        <Header />
        <div className="p-5">
          <Outlet />
        </div>
      </main>
      {language === "ar" && <AppSidebar />}
    </SidebarProvider>
  );
}

const Header = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div
      className="px-5 h-14 flex items-center gap-2 justify-between border-b"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger />
        <div className="flex items-center gap-2 bg-sidebar py-2 px-3 rounded-full w-1/2 border">
          <Search className="size-5" />
          <input
            type="search"
            name="filter"
            id="filter"
            placeholder="Seacrh by name, email, status"
            className="flex-1 outline-none bg-transparent text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-2">
          <SelectLanguage />
          <SelectTheme />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary">
          <Upload /> Import
        </Button>
        <Button onClick={() => navigate("/create-page")}>
          <Plus /> New Project
        </Button>
      </div>
    </div>
  );
};
