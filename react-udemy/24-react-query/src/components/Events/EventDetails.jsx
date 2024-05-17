import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';

import Header from '../Header.jsx';
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteEvent, fetchEvent, queryClient} from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const navigate = useNavigate();
  const {id} = useParams();

  const {data, isError, error, isLoading} = useQuery({
    queryKey: ['event', {id}],
    queryFn:({signal}) => fetchEvent({id, signal})
  })

  const {mutate, isPending} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["events"]})
      navigate("/events");
    }
  })

  let imageSource = "http://localhost:3000/";

  function handleDeleteEvent() {
    if(confirm("Are you sure on deleting this event?"))
    mutate({id});
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isLoading && <LoadingIndicator />}
      {isError && <ErrorBlock title={"Failed to load event"} message={error.info?.message || "Please try again."} />}
      {data &&
      <article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDeleteEvent}>{isPending ? "Deleting..." : "Delete"}</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={imageSource + data.image} alt={"image"} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>}
    </>
  );
}
