
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useI18n } from "../../context/I18nContext";
import {
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { generateAvatar } from "../../utils/avatar";
import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const selectedLanguage = languages.find((l) => l.code === locale) || languages[0];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="px-3 cursor-pointer py-1.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-white text-sm font-medium flex items-center justify-center"
      >
        <span className="mr-2">{selectedLanguage.flag}</span>
        {selectedLanguage.label}
        <svg
          className="ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </Menu.Button>

      <Menu.Items className="cursor-pointer absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg">
        {languages.map((l) => (
          <Menu.Item key={l.code}>
            {({ active }) => (
              <button
                onClick={() => setLocale(l.code as any)}
                className={`cursor-pointer w-full text-left px-3 py-2 text-sm flex items-center gap-2 ${
                  locale === l.code
                    ? "bg-primary-600 text-slate-900"
                    : active
                    ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <span>{l.flag}</span>
                {l.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

const Header: React.FC = () => {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const onToggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const enabled = html.classList.contains("dark");
    setIsDarkMode(enabled);
    localStorage.setItem("theme", enabled ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      setIsDarkMode(prefersDark);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const { initials, bgColor } = generateAvatar(user?.fullName || "Admin");

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        {t("header.title")}
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />

        <button
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full cursor-pointer text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 outline-none transition"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>

        <div className="flex items-center space-x-2">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => navigate("/settings")}
          >
            <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
              {user?.fullName || "Admin"}
            </span>
          </div>
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer"
            style={{ backgroundColor: bgColor }}
            title={user?.fullName || "Admin"}
            onClick={() => navigate("/settings")}
          >
            {initials}
          </div>
        </div>

        <button
          onClick={handleLogout}
          aria-label="Logout"
          title={t("header.logout")}
          className="p-2 cursor-pointer bg-slate-100 rounded-full text-black dark:text-black hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
