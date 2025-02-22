import SelectLanguage from "../../components/SelectLanguage";
import { SelectTheme } from "../../components/SelectTheme";
import { useLanguage } from "../../context/LanguageContext";
import { SidebarTrigger } from "../../components/ui/sidebar";

export default function UserHeader() {
  const { language } = useLanguage();
  
  return (
    <>
      <div
        className="px-5 h-14 flex items-center gap-2 justify-between border-b"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <SelectLanguage />
          <SelectTheme />
        </div>
      </div>
    </>
  );
}
