import { useCallback, useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";
import Search from "./components/Search";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("petName");

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setAppointmentList(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : order;
    });

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        <BiCalendar className="inline-block text-red-400 align-top" /> Your
        Appointments
      </h1>
      <AddAppointment
        lastId={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
        onSendAppointment={(myAppointment) => {
          setAppointmentList([...appointmentList, myAppointment]);
        }}
      />
      <Search
        query={query}
        onQueryChange={(query) => {
          setQuery(query);
        }}
        orderBy={orderBy}
        setOrderBy={(myOrder) => {
          setOrderBy(myOrder);
        }}
        sortBy={sortBy}
        setSortBy={(mysort) => {
          setSortBy(mysort);
        }}
      />
      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            onDeleteAppointment={(appointmentId) => {
              setAppointmentList(
                appointmentList.filter(
                  (appointment) => appointmentId !== appointment.id
                )
              );
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
