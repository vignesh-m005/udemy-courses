import {Link, useNavigate, useParams} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import {useMutation, useQuery} from "@tanstack/react-query";
import {queryClient, updateEvent} from "../../util/http.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const {id} = useParams();

  const {data: event} = useQuery({
    queryKey: ['event', {id}]
  });

  const {mutate} = useMutation({
    mutationFn:updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["events", 'event', {id}]});
      navigate("../");
    }
  });

  function handleSubmit(formData) {
    mutate({id, eventData:formData});
  }

  function handleClose() {
    navigate('../');
  }

  return (

    <Modal onClose={handleClose}>
      {event &&
      <EventForm inputData={event} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>}
    </Modal>
  );
}
