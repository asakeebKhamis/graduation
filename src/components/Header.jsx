import SelectLanguage from "./SelectLanguage";
import { SelectTheme } from "./SelectTheme";
import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Link, Outlet } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { HeaderData } from "../lib/languages";

export default function HeaderPage() {
  const { language } = useLanguage();
  const currentTranslation = HeaderData[language] || HeaderData["en"];

  return (
    <>
      <div
        className="px-5 h-14 flex items-center gap-2 justify-between border-b"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <Link to={"/"} className="flex items-center gap-2">
          <BookOpen />
          <span>{currentTranslation.academyName}</span>
        </Link>
        <div className="flex items-center gap-2">
          <SelectLanguage />
          <SelectTheme />
          <Button asChild>
            <Link to={"/register"}>{currentTranslation.register}</Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link to={"/login"}>{currentTranslation.login}</Link>
          </Button>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}
