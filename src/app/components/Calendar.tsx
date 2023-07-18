"use client";
import React, { useEffect, useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const themes = [
  {
    value: "blue",
    label: "Blue Theme",
  },
  {
    value: "red",
    label: "Red Theme",
  },
  {
    value: "yellow",
    label: "Yellow Theme",
  },
  {
    value: "green",
    label: "Green Theme",
  },
  {
    value: "purple",
    label: "Purple Theme",
  },
];

const eventClassNameTheme: { [id: string]: string } = {
  blue: "border-blue-200 text-blue-800 bg-blue-100",
  red: "border-red-200 text-red-800 bg-red-100",
  yellow: "border-yellow-200 text-yellow-800 bg-yellow-100",
  green: "border-green-200 text-green-800 bg-green-100",
  purple: "border-purple-200 text-purple-800 bg-purple-100",
};

interface EventProps {
  eventDate: Date;
  eventTitle: string;
  eventTheme: string;
}

const classNameJoin = (first: string, second: string) => {
  return first + " " + second;
};

export default function Calendar() {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2010);
  const [numOfDays, setNumOfDays] = useState<number[]>([]);
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventTheme, setEventTheme] = useState("blue");

  const initDate = () => {
    let today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const getNumOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setNumOfDays(daysArray);
  };

  const isToday = (date: number) => {
    const today = new Date();
    const dayRef = new Date(year, month, date);
    return today.toDateString() === dayRef.toDateString();
  };

  const showEventModalHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: number
  ) => {
    event.preventDefault();
    setPickedDate(new Date(year, month, date));
    setShowModal(true);
  };

  const addEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (eventTitle != "" && eventTheme) {
      const newEvent: EventProps = {
        eventTitle,
        eventTheme,
        eventDate: pickedDate,
      };
      setEvents([...events, newEvent]);
      setShowModal(false);
    }
  };

  useEffect(() => {
    initDate();
    getNumOfDays();
  }, []);

  return (
    <>
      <div className="antialiased sans-serif bg-gray-100 h-screen">
        <div className="container mx-auto px-4 py-2 md:py-24 w-2/3 ">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between py-2 px-6">
              <div>
                <span className="text-lg font-bold text-gray-800">
                  {months[month]}
                </span>
                <span className="ml-1 text-lg text-gray-600 font-normal">
                  {year}
                </span>
              </div>
              <div className="border rounded-lg px-1 pt-0.5">
                <button
                  type="button"
                  className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center "
                  // disabled={month === 0}
                  onClick={(e) => {
                    e.preventDefault();
                    if (month === 0) {
                      setMonth(11);
                      setYear(year - 1);
                    } else {
                      setMonth(month - 1);
                    }
                    getNumOfDays();
                  }}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex leading-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div className="border-r inline-flex h-6"></div>
                <button
                  type="button"
                  className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"
                  // disabled={month === 11}
                  onClick={(e) => {
                    e.preventDefault();
                    if (month === 11) {
                      setMonth(0);
                      setYear(year + 1);
                    } else {
                      setMonth(month + 1);
                    }
                    getNumOfDays();
                  }}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex leading-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="-mx-1 -mb-1">
              <div className="flex flex-wrap mb-2">
                {days.map((day, index) => (
                  <div
                    className="px-2 py-2 "
                    key={index}
                    style={{ width: "14.26%" }}
                  >
                    <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap border-t border-l">
                {blankDays.map((day) => (
                  <div
                    key={day}
                    style={{
                      width: "14.28%",
                      height: "120px",
                    }}
                    className="text-center border-r border-b px-4 pt-2"
                  ></div>
                ))}
                {numOfDays.map((day) => (
                  <div
                    key={day}
                    style={{
                      width: "14.28%",
                      height: "120px",
                    }}
                    className="px-4 pt-2 border-r border-b relative"
                  >
                    <div
                      onClick={(e) => showEventModalHandler(e, day)}
                      className={classNameJoin(
                        "inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100",
                        isToday(day)
                          ? "text-white bg-blue-500"
                          : "text-gray-700 hover:bg-blue-200"
                      )}
                    >
                      {day}
                    </div>
                    <div
                      style={{ height: "80px" }}
                      className="overflow-y-auto mt-1"
                    >
                      {events
                        .filter(
                          (e) =>
                            new Date(e.eventDate).toString() ===
                            new Date(year, month, day).toString()
                        )
                        .map((event, index) => (
                          <div
                            key={index}
                            className={classNameJoin(
                              "px-2 py-1 rounded-lg mt-1 overflow-hidden border",
                              eventClassNameTheme[event.eventTheme]
                            )}
                          >
                            <p className="text-sm truncate leading-tight">
                              {event.eventTitle}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      {showModal && (
        <div className="bg-black fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full opacity-90">
          <div className="p-4 max-w-xl mx-auto  absolute left-0 right-0 overflow-hidden mt-24">
            <button
              className="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
            >
              <svg
                className="fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
              </svg>
            </button>
            <div className="shadow w-full rounded-lg bg-white overflow-hidden block p-8">
              <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">
                Add Event Details
              </h2>
              <div className="mb-4">
                <label
                  className="text-gray-800 block mb-1 font-bold text-sm tracking-wide"
                  id="title"
                >
                  Event title
                </label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  id="title"
                  onChange={(e) => {
                    setEventTitle(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                {" "}
                <label
                  className="text-gray-800 block mb-1 font-bold text-sm tracking-wide"
                  id="date"
                >
                  Event date
                </label>
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  id="date"
                  disabled={true}
                  value={pickedDate.toLocaleDateString()}
                  onChange={(e) => {
                    setEventTitle(e.target.value);
                  }}
                />
              </div>
              <div className="inline-block w-64 mb-4">
                <label
                  className="text-gray-800 block mb-1 font-bold text-sm tracking-wide"
                  id="theme"
                >
                  Select a theme
                </label>
                <div className="relative">
                  <select
                    onChange={(e) => setEventTheme(e.target.value)}
                    name="theme"
                    id="theme"
                    className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-gray-700"
                  >
                    {themes.map((theme) => (
                      <option value={theme.value} key={theme.value}>
                        {theme.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-right">
                <button
                  type="button"
                  className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm"
                  onClick={addEventHandler}
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
