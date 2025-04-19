import axiosInstance from "@/utils/axiosInstance";
import moment from "jalali-moment";

export const fetchUnavailableDates = async ({ queryKey }) => {
  const [_, fromDate, toDate, field] = queryKey;
  const response = await axiosInstance.get(`/reserve-dates/between-dates`, {
    params: {
      from_date: fromDate,
      to_date: toDate,
      field: field,
    },
  });
  const result = response.data;
  return result.data.reduce((acc, item) => {
    const date = moment(item.date).format("jYYYY/jMM/jDD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      id: item.time._id,
      name: item.reservation?.name || "Unknown",
    });
    return acc;
  }, {});
};
