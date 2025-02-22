import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import StarRating from "../../components/StarRating";
import { useParams } from "react-router-dom";
import { Progress } from "../../components/ui/progress";
import { CoursesData } from "../../lib/languages";

export default function UserCourses() {
  const { courseType } = useParams();
  const { language } = useLanguage();
  const t = CoursesData[language] || CoursesData["en"];

  const courses = [
    {
      id: 1,
      image: "/banner.webp",
      instructor: {
        name: "Dr. Safwat",
        avatar:
          "https://asakeeb.com/teacher/img/profiles/debe4c76-c4de-48c1-a564-123f6a78a930%D8%AF%20%D8%B5%D9%88%D9%81%D8%AA.png",
      },
      title: "Full Stack Web Development",
      description:
        "This is a Full Stack course specializing in training on website design techniques using Html, Css, the Bootstrap library, and Javascript, as well as programming using the Php language. The course is a professional application, in cooperation with the Arab Digital Design, Programming and Training Company.",
      lectures: "6 lectures live - 6h, 40m",
      rating: 5,
      courseType: "current", // can be 'watched', 'completed', or 'current'
      progress: 33, // percentage
      completedLectures: "2/6 lectures",
    },
    {
      id: 2,
      image: "/banner.webp",
      instructor: {
        name: "Dr. Ahmed",
        avatar:
          "https://asakeeb.com/teacher/img/profiles/debe4c76-c4de-48c1-a564-123f6a78a930%D8%AF%20%D8%B5%D9%88%D9%81%D8%AA.png",
      },
      title: "Frontend Development with React",
      description:
        "Learn modern frontend development with React, Redux, and Next.js. This course covers everything from basic concepts to advanced state management and performance optimization.",
      lectures: "10 lectures live - 12h, 30m",
      rating: 4,
      courseType: "watched",
      progress: 0,
      completedLectures: "0/10 lectures",
    },
    {
      id: 3,
      image: "/banner.webp",
      instructor: {
        name: "Dr. Sarah",
        avatar:
          "https://asakeeb.com/teacher/img/profiles/debe4c76-c4de-48c1-a564-123f6a78a930%D8%AF%20%D8%B5%D9%88%D9%81%D8%AA.png",
      },
      title: "Backend Development with Node.js",
      description:
        "Master backend development using Node.js, Express, and MongoDB. This course is designed to teach you how to build scalable and secure server-side applications.",
      lectures: "8 lectures live - 9h, 15m",
      rating: 3,
      courseType: "completed",
      progress: 100,
      completedLectures: "8/8 lectures",
    },
    {
      id: 4,
      image: "/banner.webp",
      instructor: {
        name: "Dr. Emily",
        avatar:
          "https://asakeeb.com/teacher/img/profiles/debe4c76-c4de-48c1-a564-123f6a78a930%D8%AF%20%D8%B5%D9%88%D9%81%D8%AA.png",
      },
      title: "Data Science with Python",
      description:
        "Explore data analysis, machine learning, and visualization techniques using Python. Learn how to work with libraries such as Pandas, NumPy, and Scikit-learn.",
      lectures: "12 lectures live - 15h, 20m",
      rating: 2,
      courseType: "current",
      progress: 50,
      completedLectures: "6/12 lectures",
    },
    {
      id: 5,
      image: "/banner.webp",
      instructor: {
        name: "Dr. John",
        avatar:
          "https://asakeeb.com/teacher/img/profiles/debe4c76-c4de-48c1-a564-123f6a78a930%D8%AF%20%D8%B5%D9%88%D9%81%D8%AA.png",
      },
      title: "Cybersecurity Fundamentals",
      description:
        "Understand the basics of cybersecurity, ethical hacking, and data protection. This course provides hands-on experience with security tools and best practices.",
      lectures: "7 lectures live - 10h, 30m",
      rating: 4,
      courseType: "watched",
      progress: 0,
      completedLectures: "0/7 lectures",
    },
  ];

  const [sortBy, setSortBy] = useState("latest");

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortBy === "latest") return b.id - a.id; // Newest courses first
    if (sortBy === "rating") return b.rating - a.rating; // Highest rated first
    if (sortBy === "price") return a.rating - b.rating; // Assuming lower rating means cheaper course
    return 0;
  });

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold text-xl">
          {courseType === "watched"
            ? t.coursesWatched
            : courseType === "completed"
            ? t.completedCourses
            : t.currentCourses}
        </p>
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[9rem]">
            <SelectValue placeholder={t.sortBy} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">{t.latest}</SelectItem>
            <SelectItem value="rating">{t.rating}</SelectItem>
            <SelectItem value="price">{t.price}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCourses.map((item, index) => (
          <CourseCard key={index} courseType={courseType} item={item} />
        ))}
      </div>
    </div>
  );
}

const CourseCard = ({ courseType, item }) => {
  const [showMore, setShowMore] = useState(false);
  const { language } = useLanguage();
  const t = CoursesData[language] || CoursesData["en"];

  return (
    <Card className="overflow-hidden h-fit transition-transform duration-500 hover:-translate-y-2">
      <img
        src={item.image}
        alt=""
        loading="lazy"
        className="object-contain w-full scale-105"
      />
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-md">
            <img
              src={item.instructor.avatar}
              alt="A"
              loading="lazy"
              className="object-cover"
            />
          </div>
          <p className="font-semibold text-muted-foreground truncate text-sm">
            {item.instructor.name}
          </p>
        </div>
        <p className="font-semibold text-lg">{item.title}</p>
        <div>
          <span
            className={`text-muted-foreground ${!showMore && "line-clamp-2"}`}
          >
            {item.description}
          </span>{" "}
          <p
            variant={"link"}
            className="p-0 text-primary underline-offset-4 underline text-sm cursor-pointer inline-block font-semibold"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? t.showLess : t.showMore}
          </p>
        </div>
        <div className="flex justify-between flex-wrap gap-2">
          <p className="text-sm text-muted-foreground">{item.lectures}</p>
          <StarRating rating={item.rating} />
        </div>

        {courseType === "current" && (
          <div>
            <p className="flex items-center gap-2 justify-between font-semibold text-muted-foreground text-sm">
              <span className="text-green-500">{item.progress}%</span>{" "}
              <span>{item.completedLectures}</span>
            </p>
            <Progress value={item.progress} />
          </div>
        )}

        <Button className="w-full h-10 bg-blue-600 text-white hover:bg-blue-600/80">
          {courseType === "watched"
            ? t.registerNow
            : courseType === "completed"
            ? t.completed
            : t.continueWatching}
        </Button>
      </CardContent>
    </Card>
  );
};
