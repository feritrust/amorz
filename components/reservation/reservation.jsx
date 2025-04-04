"use client";
import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import { useGetUser } from "@/hook/useGetUser";
import { useToken } from "@/context/TokenContext";
import { useGetFields } from "@/hook/useGetFields";
import { Combobox } from "../ui/combobox";
const Reservation = () => {
  const { token } = useToken();
  const [name, setName] = useState("special fee");
  const [field, setField] = useState("");
  const [teammates, setTeammates] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCoach, setSelectedCoach] = useState(null);
  console.log("selected coach", selectedCoach);
  console.log("teammates", teammates);
  const { data: user } = useGetUser(token);
  const { data: fields } = useGetFields();
  console.log("fields", fields);
  console.log(user?.role);
  const [times, setTimes] = useState([]);
  const [price, setPrice] = useState(0);
  const [currentYear, setCurrentYear] = useState(moment().locale("fa").jYear());
  const [currentMonth, setCurrentMonth] = useState(
    moment().locale("fa").jMonth() + 1
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selections, setSelections] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [repeatWeeks, setRepeatWeeks] = useState({});
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [error, setError] = useState(null);

  const [unavailableDates, setUnavailableDates] = useState({});
  console.log("unavailable date", unavailableDates);
  const getDateRange = (year, month) => {
    const fromDate = moment(`${year}/${month}/1`, "jYYYY/jMM/jDD").format(
      "YYYY-MM-DD"
    );
    const toDate = moment(`${year}/${month}/1`, "jYYYY/jMM/jDD")
      .endOf("jMonth")
      .format("YYYY-MM-DD");
    return { fromDate, toDate };
  };

  useEffect(() => {
    // Fetch coaches data from the API
    const fetchCoaches = async () => {
      try {
        const response = await fetch(
          `http://88.99.55.86:3000/users/?role=coach&phoneNumber=${query}`
        );
        const data = await response.json();
        setCoaches(data.data); // Assuming the API returns an array of coaches
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };

    fetchCoaches();
  }, [query]);
  console.log("query", query);

  // Filter coaches based on the query

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      const { fromDate, toDate } = getDateRange(currentYear, currentMonth);
      try {
        const response = await fetch(
          `http://88.99.55.86:3000/reserve-dates/between-dates?from_date=${fromDate}&to_date=${toDate}&field=${field}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch unavailable dates");
        }
        const result = await response.json();

        const transformedData = result.data.reduce((acc, item) => {
          const date = moment(item.date).format("jYYYY/jMM/jDD");

          if (!acc[date]) {
            acc[date] = [];
          }

          acc[date].push({
            id: item.time._id,
            name: item.reservation?.name || "Unknown", // fallback if name is missing
          });

          return acc;
        }, {});

        console.log("data", transformedData);
        setUnavailableDates(transformedData);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch unavailable dates");
      }
    };

    fetchUnavailableDates();
  }, [currentYear, currentMonth, field]);
  const generateCalendarDays = (year, month) => {
    const daysInMonth = moment(
      `${year}/${month}/1`,
      "jYYYY/jMM/jDD"
    ).jDaysInMonth();
    const firstDayOfMonth = moment(
      `${year}/${month}/1`,
      "jYYYY/jMM/jDD"
    ).weekday();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return { days, firstDayOfMonth };
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
    if (isCalendarOpen) {
      setSelectedDate(null);
    }
  };

  const handleMonthChange = (e) => {
    setCurrentMonth(Number(e.target.value));
    setSelectedDate(null);
  };

  const handleYearChange = (e) => {
    setCurrentYear(Number(e.target.value));
    setSelectedDate(null);
  };

  const handleDateSelect = (day) => {
    const date = `${currentYear}/${String(currentMonth).padStart(
      2,
      "0"
    )}/${String(day).padStart(2, "0")}`;
    setSelectedDate(date);
    setHighlightedDates([date]);
  };

  const handleTimeSelect = (time) => {
    if (selectedDate) {
      if (isTimeReserved(selectedDate, time)) {
        setError(`The time ${time} on ${selectedDate} is already reserved.`);
        return;
      }

      const isDateTimeAlreadySelected = selections.some(
        (selection) =>
          selection.dates.includes(selectedDate) && selection.time === time
      );

      if (isDateTimeAlreadySelected) {
        setError(
          `The time ${time} on ${selectedDate} has already been selected.`
        );
        return;
      }

      setSelections((prevSelections) => {
        const existingSelection = prevSelections.find(
          (selection) =>
            selection.first_date === selectedDate && selection.time === time
        );

        if (existingSelection) {
          if (!existingSelection.dates.includes(selectedDate)) {
            existingSelection.dates.push(selectedDate);
          }
        } else {
          prevSelections.push({
            first_date: selectedDate,
            time: time,
            dates: [selectedDate],
          });
        }

        return [...prevSelections];
      });
      setError(null);
    }
  };
  const handleRepeatWeeksChange = (time, e) => {
    const weeks = Number(e.target.value);
    setRepeatWeeks((prevWeeks) => ({
      ...prevWeeks,
      [time]: weeks,
    }));

    const startMoment = moment(selectedDate, "jYYYY/jMM/jDD");
    const newRepeatedDates = [];

    for (let i = 0; i < weeks; i++) {
      const nextDate = startMoment
        .clone()
        .add(i * 7, "days")
        .format("jYYYY/jMM/jDD");
      newRepeatedDates.push(nextDate);
    }

    const updatedSelections = selections.filter((selection) => {
      const isConflicting =
        selection.time === time &&
        newRepeatedDates.some((date) => selection.dates.includes(date));
      return !isConflicting;
    });

    const conflictingDatesWithTimes = newRepeatedDates.reduce((acc, date) => {
      if (date === selectedDate) return acc;

      if (
        updatedSelections.some(
          (selection) =>
            selection.dates.includes(date) && selection.time === time
        )
      ) {
        acc.push(`${date}: ${time} (Already selected)`);
      }

      if (unavailableDates[date]?.includes(time)) {
        acc.push(`${date}: ${time} (Unavailable)`);
      }

      return acc;
    }, []);

    if (conflictingDatesWithTimes.length > 0) {
      setError(
        `The following times are already selected or unavailable: ${conflictingDatesWithTimes.join(
          ", "
        )}`
      );
      return;
    }

    updatedSelections.push({
      first_date: selectedDate,
      time: time,
      dates: [...newRepeatedDates],
    });

    setSelections(updatedSelections);
    setError(null);
  };

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await fetch("http://88.99.55.86:3000/times");
        if (!response.ok) {
          throw new Error("Failed to fetch times");
        }
        const data = await response.json();
        setTimes(data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch times. Please try again.");
      }
    };

    fetchTimes();
  }, []);

  const removeSelection = (index) => {
    const updatedSelections = [...selections];
    updatedSelections.splice(index, 1);
    setSelections(updatedSelections);
  };

const isTimeReserved = (date, timeId) => {
  return unavailableDates[date]?.find((entry) => entry.id === timeId);
};
  const isDisabled = (date, time) => {
    if (isTimeReserved(date, time)) {
      const reservedEntry = isTimeReserved(date, time);
      console.log("cigi", reservedEntry);
      return reservedEntry ? reservedEntry.name : false;
    }
    return selections.some(
      (selection) =>
        selection.dates.includes(date) &&
        selection.time === time &&
        selection.first_date !== date
    );
  };

  useEffect(() => {
    console.log("Current selections:", selections);
  }, [selections]);

  const today = moment().locale("fa").format("jYYYY/jMM/jDD");

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="justify-center items-center flex h-screen ">
      <div className="relative w-64  ">
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          onChange={(e) => setField(e.target.value)} // Replace with your handler
        >
          <option value="">Select a field</option>
          {fields?.map((field) => (
            <option key={field._id} value={field._id}>
              {field.name}
            </option>
          ))}
        </select>
        <div className="w-full mt-2 bg-white border rounded-md shadow-lg">
          <div className="flex justify-between p-2">
            <select
              value={currentMonth}
              onChange={handleMonthChange}
              className="text-sm font-medium text-gray-600 border rounded-md"
            >
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={currentYear}
              onChange={handleYearChange}
              className="text-sm font-medium text-gray-600 border rounded-md"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1 p-2 text-center">
            {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
              <div key={day} className="text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="text-sm"></div>
            ))}
            {generateCalendarDays(currentYear, currentMonth).days.map((day) => {
              const date = `${currentYear}/${String(currentMonth).padStart(
                2,
                "0"
              )}/${String(day).padStart(2, "0")}`;
              const isSelected = selectedDate === date;
              const isHighlighted = highlightedDates.includes(date);
              const isDateInSelection = selections.some((selection) =>
                selection.dates.includes(date)
              );

              let buttonClass =
                "w-full px-2 py-1 text-sm font-medium rounded hover:bg-blue-500 hover:text-white";
              if (isSelected) {
                buttonClass += " bg-yellow-300";
              } else if (isHighlighted) {
                buttonClass += " bg-blue-400 text-white";
              } else if (isDateInSelection) {
                buttonClass += " bg-blue-100";
              }

              if (date === today) {
                buttonClass += " bg-green-500 text-white";
              }

              const isDisabledButton =
                isDisabled(date, "09:00") &&
                isDisabled(date, "12:00") &&
                isDisabled(date, "13:00");

              return (
                <button
                  key={day}
                  onClick={() => !isDisabledButton && handleDateSelect(day)}
                  className={`${buttonClass} ${
                    isDisabledButton
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={isDisabledButton}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="grid grid-cols-1 gap-4 justify-around p-2">
              {times.map((time) => {
                const isSelected = selections.some(
                  (selection) =>
                    selection.first_date === selectedDate &&
                    selection.time === time._id
                );
                const isDisabledTime = isDisabled(selectedDate, time._id);

                return (
                  <div key={time._id} className="flex items-center">
                    {JSON.stringify(isDisabledTime)}
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded ${
                        isSelected
                          ? "bg-green-500 text-white"
                          : isDisabledTime
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() =>
                        !isDisabledTime && handleTimeSelect(time._id)
                      }
                      disabled={isDisabledTime}
                    >
                      {time.time}
                    </button>

                    {isSelected && (
                      <div className="ml-2">
                        <select
                          onChange={(e) => handleRepeatWeeksChange(time._id, e)}
                          value={repeatWeeks[time._id] || 0}
                          className="border rounded p-1"
                        >
                          <option value={0}>Select Weeks</option>
                          <option value={1}>1 Week</option>
                          <option value={5}>5 Weeks</option>
                          <option value={10}>10 Weeks</option>
                        </select>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-lg font-bold">Selected Dates and Times</h3>
          <ul className="space-y-2">
            {selections.length === 0 && (
              <li className="text-gray-500">No selections yet.</li>
            )}
            {selections.map((selection, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <div className="font-semibold">
                    {selection.first_date} - {selection.time}
                  </div>
                  <div className="text-sm text-gray-600">
                    Repeated Dates: {selection.dates.join(", ")}
                  </div>
                </div>
                <button
                  onClick={() => removeSelection(index)}
                  className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {user?.role === "admin" && (
            <>
              <select
                onChange={(e) => setName(e.target.value)}
                value={"special fee"}
              >
                <option value="event">for event</option>
                <option value="coach">for coach</option>
                <option value="special fee">special fee</option>
              </select>
            </>
          )}
          {name == "coach" && (
            <>
              <Combobox
                value={selectedCoach}
                onChange={(value) => {
                  setTeammates([value.phoneNumber]);
                  setSelectedCoach(value);
                }}
                onInputChange={(value) => setQuery(value)}
                placeholder="Search for a coach"
              >
                {coaches.map((coach) => (
                  <Combobox.Option key={coach._id} value={coach}>
                    {coach.phoneNumber}
                  </Combobox.Option>
                ))}
              </Combobox>
            </>
          )}
          {(user?.role == "admin" || user?.role == "coach") && (
            <>
              discount
              <input
                type="text"
                placeholder="discount"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </>
          )}
          {(user?.role == "admin" || user?.role == "coach") && (
            <input
              type="text"
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
          <button
            onClick={async () => {
              try {
                const convertedSelections = selections.map((selection) => {
                  return {
                    ...selection,
                    first_date: moment(
                      selection.first_date,
                      "jYYYY/jMM/jDD"
                    ).format("YYYY-MM-DD"), // Convert Shamsi to Miladi
                    dates: selection.dates.map((date) =>
                      moment(date, "jYYYY/jMM/jDD").format("YYYY-MM-DD")
                    ), // Convert all dates
                  };
                });

                const response = await fetch(
                  "http://88.99.55.86:3000/reservations",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                      selections: convertedSelections,
                      user: user?._id ?? "",
                      name: name ?? "",
                      field: field ?? "",
                      discount: discount ?? "",
                      price: price ?? "",
                      teammates: teammates,
                    }),
                  }
                );

                if (!response.ok) {
                  throw new Error("Failed to submit selections");
                }

                const result = await response.json();
                console.log("Submission successful:", result);
                alert("Selections submitted successfully!");
              } catch (err) {
                console.error("err", err);
                alert("Failed to submit selections. Please try again.");
              }
            }}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit Selections
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
