import { useState } from "react";
import {
  Edit,
  HelpCircle,
  IndianRupee,
  Plus,
  Settings,
  UserCheck2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
const name = "Vishal";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const callActions = [
    {
      title: "Start New Campaign / View Campaign",
      link: "/create-new-campaign",
      icon: Plus,
    },
    {
      title: "View / Edit Storefront",
      link: "/storefront",
      icon: Edit,
    },
    {
      title: "Manage Funds",
      link: "#",
      icon: IndianRupee,
    },
    {
      title: "Helpdesk",
      link: "#",
      icon: HelpCircle,
    },
    {
      title: "Admins",
      link: "/admins",
      icon: UserCheck2,
    },
    {
      title: "Settings",
      link: "#",
      icon: Settings,
    },
  ];
  return (
    <div className="mx-6">
      <section className="mt-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">Hello {name}</h1>
            <h2>Dashboard</h2>
          </div>

          <div className="grid grid-cols-7 gap-5 items-end mt-5">
            <div className="grid grid-cols-3 grid-rows-2 gap-x-3 gap-y-4 col-span-5">
              {callActions.map((action) => (
                <Link
                  to={action.link}
                  className="link-dash shadow-1 bg-white rounded-2xl"
                  key={action.title}
                >
                  <div className="card bg-third px-8 py-6 rounded-2xl h-full flex items-center justify-center">
                    <div className="items-center justify-center flex-col gap-4 relative z-2 flex">
                      <action.icon
                        size={40}
                        className="bg-first text-white rounded-full p-1"
                      />
                      <p className="text-md text-center">{action.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="col-span-2 h-full">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow bg-white cal-body"
                classNames={{
                  table: "w-full",
                  caption_end: "w-full",
                  head_row: "justify-between flex",
                  row: "justify-between flex",
                  day_today: "bg-first text-white",
                  day_selected: "bg-first text-white hover:text-white",
                  nav_button: "bg-second p-2 rounded-full",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
