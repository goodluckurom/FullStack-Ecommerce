import { useEffect } from "react";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={false} />
      <EventCard active={false} />
    </div>
  );
};

export default EventsPage;
