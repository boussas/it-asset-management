import React from "react";
import Card from "../ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <Card>
      <div className="p-5 flex items-center">
        <div className="shrink-0">{icon}</div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {value}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
