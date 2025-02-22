import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { Card, CardContent } from "../../components/ui/card";
import { Edit3 } from "lucide-react";
import StarRating from "../../components/StarRating";
import { SettingsData } from "../../lib/languages";

export default function UserSettings() {
  const { language } = useLanguage();
  const t = SettingsData[language] || SettingsData["en"];

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Title */}
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-xl">{t.myProfile}</p>
        <Button
          className="rounded-full bg-blue-600 text-white hover:bg-blue-600/80 "
          size="lg"
        >
          {t.save}
        </Button>
      </div>

      {/* Profile */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
                <img
                  src="https://asakeeb.com/teacher/img/profiles/debe4c76-c4de-48c1-a564-123f6a78a930%D8%AF%20%D8%B5%D9%88%D9%81%D8%AA.png"
                  alt="A"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="-space-y-1">
                <p className="font-semibold truncate text-xl mb-1">
                  Dr. Safwat Asakeeb
                </p>
                <p className="text-muted-foreground truncate">
                  Sixth grade student
                </p>
                <p className="text-muted-foreground truncate">Cairo, Egypt</p>
              </div>
            </div>
            <Button className="rounded-full px-5" variant="outline">
              {t.edit}
              <Edit3 />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal information */}
      <p className="font-semibold text-lg">{t.personalInfo}</p>
      <Card>
        <CardContent className="p-4 space-y-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-muted-foreground text-xs">
                {t.educationalStage}
              </p>
              <p className="font-semibold text-sm">Second Secondary Grade</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{t.institute}</p>
              <p className="font-semibold text-sm">Al-Masry</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{t.number}</p>
              <p className="font-semibold text-sm">+20123456789</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{t.email}</p>
              <p className="font-semibold text-sm">www.example.com</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground text-xs">{t.aboutMe}</p>
              <p className="font-semibold text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
                magni labore porro quasi eveniet velit quod aperiam.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{t.currentTime}</p>
              <p className="font-semibold text-sm">10:30 AM Egypt Time</p>
            </div>
            <div className="col-span-2 space-y-2">
              <p className="text-muted-foreground text-xs">{t.subjects}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  className="rounded-full bg-blue-600 text-white hover:bg-blue-600/80 "
                  size="sm"
                >
                  German Language
                </Button>
                <Button
                  className="rounded-full bg-blue-600 text-white hover:bg-blue-600/80 "
                  size="sm"
                >
                  Arabic Language
                </Button>
                <Button
                  className="rounded-full bg-blue-600 text-white hover:bg-blue-600/80 "
                  size="sm"
                >
                  Mathematics
                </Button>
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 ${language === "ar" ? "left-4" : "right-4"}`}
          >
            <Button className="rounded-full px-5" variant="outline">
              {t.edit}
              <Edit3 />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificates and achievements */}
      <p className="font-semibold text-lg">{t.certificates}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((item, index) => (
          <CertificateCard key={index} item={item} />
        ))}
      </div>

      {/* Previous projects and works */}
      <p className="font-semibold text-lg">{t.previousProjects}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((item, index) => (
          <CertificateCard key={index} item={item} />
        ))}
      </div>

      {/* Reviews and comments */}
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-lg">{t.reviews}</p>
        <Button
          variant="link"
          className="underline text-muted-foreground p-0"
          asChild
        >
          <Link to="/">{t.viewAllReviews}</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item, index) => (
          <ReviewCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

const CertificateCard = () => {
  const { language } = useLanguage();
  const t = SettingsData[language] || SettingsData["en"];

  return (
    <Card className="overflow-hidden h-fit transition-transform duration-500 hover:-translate-y-2">
      <img
        src="/banner.webp"
        alt="banner"
        loading="lazy"
        className="object-contain w-full scale-105"
      />
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-md">
            <img
              src={
                "https://asakeeb.com/teacher/img/profiles/debe4c76-c4de-48c1-a564-123f6a78a930%D8%AF%20%D8%B5%D9%88%D9%81%D8%AA.png"
              }
              alt="A"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <p className="font-semibold text-muted-foreground truncate text-sm">
            Dr. Safwat
          </p>
        </div>
        <p className="font-semibold text-lg">Full Stack Web Development</p>

        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>5 April 2025</p>
          <p>12h, 23m</p>
          <p>
            {t.degree}:{" "}
            <span className="text-green-500 font-semibold">98%</span>
          </p>
        </div>

        <Button className="w-full h-10 bg-blue-600 text-white hover:bg-blue-600/80">
          {t.viewCertificate}
        </Button>
      </CardContent>
    </Card>
  );
};

const ReviewCard = () => {
  return (
    <Card className="overflow-hidden h-fit transition-transform duration-500 hover:scale-[1.01]">
      <CardContent className="p-4 space-y-1">
        <p className="font-semibold text-lg mb-2">Full Stack Web Development</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-muted-foreground text-base">
            This is the best course i have seen :)
          </p>
          <StarRating rating={4} />
        </div>
        <div className="flex items-center justify-between gap-2 text-muted-foreground text-sm">
          <p className="">10 April 2025</p>
          <p className="">Dr. Safwat</p>
        </div>
      </CardContent>
    </Card>
  );
};
