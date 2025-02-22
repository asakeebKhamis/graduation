import {
  BadgeCheck,
  Bell,
  BookMarked,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CreditCardIcon,
  DollarSign,
  Folder,
  Forward,
  Home,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  MoreHorizontal,
  Settings,
  Sparkles,
  Trash2,
  User2,
  Users2,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { useLanguage } from "../context/LanguageContext";
import { SidebarData } from "../lib/languages";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const LogoSideBar = ({ logoName }) => {
  const { theme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to={"/dashboard"} className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <img
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Logo"
                className="object-contain size-8"
              />
            </div>
            <span className="truncate font-semibold uppercase">Ufo</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export function AppSidebar() {
  const { language } = useLanguage();
  const t = SidebarData[language] || SidebarData["en"];
  const { open } = useSidebar();

  return (
    <Sidebar
      variant={"floating"}
      collapsible={"icon"}
      side={language === "ar" ? "right" : "left"}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <SidebarHeader>
        <LogoSideBar logoName={t.logoName} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItemComponent
                Icon={Home}
                url={"/dashboard"}
                title={"Home"}
              />
              <MenuItemComponent
                Icon={LayoutTemplate}
                url={"/"}
                title={"Templates"}
              />
              <MenuItemComponent Icon={Trash2} url={"/"} title={"Trash"} />
              <MenuItemComponent Icon={Settings} url={"/"} title={"Settings"} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* NavProjects */}
        <NavProjects />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem
            className={`bg-background/50 border rounded-xl p-4 space-y-2 ${
              !open && "hidden"
            }`}
          >
            <p className="font-semibold text-lg">
              Get{" "}
              <span className="bg-gradient-to-b from-amber-500 to-amber-700 bg-clip-text text-transparent">
                Creative AI
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Unlock all features including AI and More
            </p>
            <div className="p-px rounded-full bg-gradient-to-b from-amber-500 to-amber-700">
              <Button className="rounded-full w-full bg-background text-primary hover:bg-accent h-10">
                Upgrade
              </Button>
            </div>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <NavUser />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

const MenuItemComponent = ({ title, url, Icon }) => (
  <SidebarMenuItem>
    <SidebarMenuButton asChild tooltip={title}>
      <NavLink to={url}>
        <Icon />
        <span>{title}</span>
      </NavLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const CollapsComponent = ({ Icon, title, items }) => {
  const { language } = useLanguage();
  const ArrowIcon = language === "ar" ? ChevronLeft : ChevronRight;

  return (
    <Collapsible asChild className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={title}>
            {Icon && <Icon />}
            <span>{title}</span>
            <ArrowIcon
              className={`${
                language === "ar"
                  ? "mr-auto group-data-[state=open]/collapsible:-rotate-90"
                  : "ml-auto group-data-[state=open]/collapsible:rotate-90"
              } transition-transform duration-200`}
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((item) => (
              <SidebarMenuSubItem key={item.title} tooltip={item.title}>
                <SidebarMenuSubButton asChild>
                  <Link to={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavProjects = () => {
  const { isMobile } = useSidebar();

  const projects = [
    {
      name: "Project1",
      url: "/dashboard",
    },
    {
      name: "Project2",
      url: "/dashboard",
    },
    {
      name: "Project3",
      url: "/dashboard",
    },
    {
      name: "Project4",
      url: "/dashboard",
    },
  ];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <span className="truncate">{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export function NavUser() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <img
                src="/favicon.ico"
                alt="Avatar"
                className="size-8 object-cover"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Mahmood Khamis</span>
                <span className="truncate text-xs">Khamis@gmail.com</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <img
                  src="/favicon.ico"
                  alt="Avatar"
                  className="size-8 object-cover"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mahmood Khamis</span>
                  <span className="truncate text-xs">Khamis@gmail.com</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
