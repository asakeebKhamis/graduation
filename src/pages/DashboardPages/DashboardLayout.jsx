import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "../../components/Sidebar/appSidebar";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { useLanguage } from "../../context/LanguageContext";
import SelectLanguage from "../../components/SelectLanguage";
import { SelectTheme } from "../../components/SelectTheme";
import { Plus, Search, Star, Upload, Zap } from "lucide-react";
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

  const [credits, setCredits] = useState(0);

  useEffect(() => {
    let target = 6785; // الرقم النهائي
    let step = Math.ceil(target / 100); // سرعة العد
    let interval = setInterval(() => {
      setCredits((prev) => {
        if (prev + step >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + step;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="px-5 h-14 flex items-center gap-2 justify-between border-b"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-2 flex-1">
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
      <div className="flex items-center gap-2 w-fit">
        {/* <Button variant="secondary">
          <Upload /> Import
        </Button> */}

        <div
          className="flex items-center gap-2 cursor-pointer py-[.4rem] px-2 bg-amber-500/20 rounded-full"
          onClick={() => navigate("/pricing")}
        >
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-ufo text-white">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ufo opacity-75"></span>
            <Zap className="h-5 w-5 relative z-10" />
          </div>
          <span className="text-base font-semibold mb-px">{credits}</span>
        </div>

        <Button onClick={() => navigate("/create-page")}>
          <Plus /> New Project
        </Button>
      </div>
    </div>
  );
};
