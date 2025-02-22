import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import {
  BookCheck,
  BookOpenText,
  Clock,
  Star,
  Target,
  Video,
} from "lucide-react";
import { CircularProgress } from "../../components/CircularProgress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useLanguage } from "../../context/LanguageContext";
import { DashboardData } from "../../lib/languages";

const FormatePrice = (price, lang) => {
  const amount = Number.parseFloat(price);
  const formattedPrice = new Intl.NumberFormat(lang || "en", {
    style: "currency",
    currency: "EGP",
  }).format(amount);
  return formattedPrice;
};

export default function UserDashboard() {
  const { language } = useLanguage();
  const t = DashboardData[language] || DashboardData["en"];

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Lessons */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-lg">{t.dailyLessons}</p>
              <Button
                variant="link"
                className="underline text-muted-foreground p-0"
                asChild
              >
                <Link to="/">{t.showMoreLessons}</Link>
              </Button>
            </div>
            <DailyLessonsCard
              title={"Fundamentals of Digital Marketing"}
              duration={"2 Hours"}
              time={"It starts in half an hour"}
            />
            <DailyLessonsCard
              title={"Fundamentals of Freelancing"}
              duration={"2 Hours"}
              time={"Live is progress now"}
              isLive={true}
            />
          </div>
          {/* Registered courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-lg">{t.registeredCourses}</p>
              <Button
                variant="link"
                className="underline text-muted-foreground p-0"
                asChild
              >
                <Link to="/">{t.showMoreCourses}</Link>
              </Button>
            </div>
            <RegisteredCoursesCard
              title={"Fundamentals of Digital Marketing"}
              residual={"2h, 45min"}
              progress={"60"}
            />
            <RegisteredCoursesCard
              title={"Fundamentals of Freelancing"}
              residual={"2h, 45min"}
              progress={"89"}
            />
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-1 space-y-4">
          {/* All Courses not rated BTN */}
          <Button
            className="w-full capitalize flex items-center justify-between h-11 rounded-xl"
            variant="outline"
          >
            <span>{t.rateTheLessons}</span>
            <div className="relative flex">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-500 opacity-75" />
              <Star fill="#eab308" color="#eab308" />
            </div>
          </Button>

          {/* Invoices */}
          <Card className="h-fit">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-lg">{t.invoices}</p>
                <Select defaultValue="today">
                  <SelectTrigger className="w-fit border-none focus:ring-0 justify-start gap-1 p-0 shadow-none">
                    <p className="text-muted-foreground text-sm">
                      <SelectValue placeholder={t.invoices} />
                    </p>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">{t.today}</SelectItem>
                    <SelectItem value="yesterday">{t.yesterday}</SelectItem>
                    <SelectItem value="tomorrow">{t.tomorrow}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <InvoicesCard
                title={t.amountDue}
                amount={1000}
                date={"12 April 2025"}
                isPaid={true}
              />
              <InvoicesCard
                title={t.paymentNotMade}
                amount={1990}
                date={"12 April 2025"}
                isPaid={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Daily schedule */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="font-semibold text-lg">{t.dailySchedule}</p>
          <DailyScheduleCard
            title={"Fundamentals of Freelancing"}
            desc={"Lecture"}
            duration={"2 Hours"}
            instructor={"khamis"}
          />
          <DailyScheduleCard
            title={"Fundamentals of Digital Marketing"}
            desc={"Lecture"}
            duration={"2 Hours"}
            instructor={"khamis"}
          />
          <DailyScheduleCard
            title={"Fundamentals of Freelancing"}
            desc={"Test"}
            duration={"2 Hours"}
            instructor={"khamis"}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-lg">{t.tests}</p>
            <Button
              variant="link"
              className="underline text-muted-foreground p-0"
              asChild
            >
              <Link to="/">{t.showMoreTests}</Link>
            </Button>
          </div>

          <TestsCard
            title={"Fundamentals of Freelancing"}
            desc={"How to Start Freelancing on website"}
            lesson={"First lesson"}
            date={"4 April"}
            degree={90}
          />
        </div>

        {/* Academic assignment */}
        <Card className="h-fit">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-lg">{t.academicAssignment}</p>
              <p className="font-bold text-lg">
                <span className="text-red-500">2</span>/8
              </p>
            </div>

            <AcademicAssignmentCard
              title={"Fundamentals of Freelancing"}
              date={"12 April 2025"}
              type={t.received}
              isReceived={true}
            />
            <AcademicAssignmentCard
              title={"Fundamentals of Freelancing"}
              date={"12 April 2025"}
              type={t.availableSoon}
              isReceived={false}
            />
            <AcademicAssignmentCard
              title={"Fundamentals of Freelancing"}
              date={"12 April 2025"}
              type={t.availableSoon}
              isReceived={false}
            />
            <AcademicAssignmentCard
              title={"Fundamentals of Freelancing"}
              date={"12 April 2025"}
              type={t.availableSoon}
              isReceived={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const DailyLessonsCard = ({ title, duration, time, isLive }) => {
  const { language } = useLanguage();
  const t = DashboardData[language] || DashboardData["en"];

  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 items-center gap-4">
        <div className="flex items-center gap-2 col-span-2 overflow-hidden">
          <div className="min-w-11 h-11 rounded-full flex items-center justify-center text-white bg-blue-600">
            <Video />
          </div>
          <p className="text-base">{title}</p>
        </div>

        <div className="">
          <p className="text-muted-foreground text-xs">{t.duration}</p>
          <p className="font-semibold text-sm">{duration}</p>
        </div>

        <div className="text-end">
          <p className="text-muted-foreground text-xs">{t.time}</p>
          <p className={`font-semibold text-sm ${isLive && "text-red-500"}`}>
            {time}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const RegisteredCoursesCard = ({ title, residual, progress }) => {
  const { language } = useLanguage();
  const t = DashboardData[language] || DashboardData["en"];

  return (
    <Card>
      <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 items-center gap-4">
        <div className="flex items-center gap-2 col-span-2">
          <div className="min-w-11 h-11 rounded-full flex items-center justify-center text-white bg-blue-600">
            <BookOpenText />
          </div>
          <p className="text-base">{title}</p>
        </div>

        <div className="">
          <p className="text-muted-foreground text-xs">{t.residual}</p>
          <p className="font-semibold text-sm">{residual}</p>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <p className="font-semibold text-sm">{progress}%</p>
          <CircularProgress
            value={progress}
            animationDuration={1000}
            strokeWidth="4"
            size="20"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const DailyScheduleCard = ({ title, desc, duration, instructor }) => {
  const { language } = useLanguage();
  const t = DashboardData[language] || DashboardData["en"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4">
      <div className="flex items-center gap-2 col-span-2">
        <div className="min-w-10 h-10 rounded-xl flex items-center justify-center text-white bg-blue-600">
          <Target />
        </div>
        <div className="space-y-1">
          <p className="text-sm">{title}</p>
          <p className="text-muted-foreground text-xs">{desc}</p>
        </div>
      </div>

      <div className="">
        <p className="text-muted-foreground text-xs">{t.duration}</p>
        <p className="font-semibold text-sm">{duration}</p>
      </div>

      <div className="text-end">
        <p className="text-muted-foreground text-xs">{t.instructor}</p>
        <p className="font-semibold text-sm">{instructor}</p>
      </div>
    </div>
  );
};

const InvoicesCard = ({ title, amount, date, isPaid }) => {
  const { language } = useLanguage();

  return (
    <div className="flex items-center justify-between gap-2">
      <p className={`text-sm font-semibold ${!isPaid && "text-red-500"}`}>
        {title}
      </p>

      <div className="space-y-1">
        <p className="text-sm font-semibold">
          {FormatePrice(amount, language)}
        </p>
        <p className="text-muted-foreground text-xs">{date}</p>
      </div>
    </div>
  );
};

const AcademicAssignmentCard = ({ title, date, type, isReceived }) => (
  <div className="flex items-center gap-4 justify-between flex-nowrap lg:flex-wrap xl:flex-nowrap">
    <div className="flex items-center gap-2">
      <div className="min-w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-600">
        <BookCheck />
      </div>
      <div className="space-y-1">
        <p className="text-sm">{title}</p>
        <p className="text-muted-foreground text-xs">{date}</p>
      </div>
    </div>
    <div className="flex w-fit lg:w-full xl:w-fit justify-end">
      <div
        className={`shadow-md text-sm text-center dark:shadow-gray-900 border rounded-xl py-1 px-2 font-semibold ${
          isReceived ? "text-green-500" : "text-blue-500"
        }`}
      >
        {type}
      </div>
    </div>
  </div>
);

const TestsCard = ({ title, desc, lesson, date, degree }) => (
  <Card>
    <CardContent className="p-4">
      <div className="rounded-full text-center text-white bg-blue-600 px-5 py-1 mb-3 w-fit">
        {title}
      </div>
      <div className="space-y-1 flex items-center justify-between gap-2">
        <div className="">
          <p className="text-base font-semibold">{desc}</p>
          <p className="text-muted-foreground text-sm mb-1">{lesson}</p>
          <div className="rounded-full border border-blue-600 bg-transparent px-2 py-1 w-fit flex items-center gap-1">
            <Clock color="#2563eb" size={15} />
            <span className="text-xs">{date}</span>
          </div>
        </div>
        <div
          className={`space-y-2 font-semibold text-base text-end ${
            degree >= 50 ? "text-green-500" : "text-red-500"
          }`}
        >
          <p className="">{degree}%</p>
          <p className="">
            {degree >= 90
              ? "Excllent"
              : degree >= 50
              ? "Good"
              : "Please repeat the test"}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
