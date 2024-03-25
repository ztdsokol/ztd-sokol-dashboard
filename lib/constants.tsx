import { ShoppingCart, LayoutDashboard, Group, Settings } from "lucide-react";
export const navLinks = [
  {
    label: "Dashboard",
    url: "/",
    icon: <LayoutDashboard />,
  },
  {
    label: "Members",
    url: "/clanovi",
    icon: <LayoutDashboard />,
  },
  {
    label: "Groups",
    url: "/grupe",
    icon: <Group />,
  },
  {
    label: "Locations",
    url: "/lokacije",
    icon: <ShoppingCart />,
  },
  {
    label: "Programs",
    url: "/programs",
    icon: <LayoutDashboard />,
  },
  {
    label: "Podešavanja",
    url: "/settings",
    icon: <Settings />,
  },
];
