import Swal from 'sweetalert2';
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { prepareEvents } from './../helpers/prepareEvents';


export const eventStartAdNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        const resp = await fetchConToken('events', event, 'POST');

        const body = await resp.json();

        try {

            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log(event);

                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error.message);
        }

    }
}




const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartUpdated = (event) => {
    return async (dispatch) => {

        try {


            const rep = await fetchConToken(`events/${event.id}`, event, 'PUT');

            const body = await rep.json();

            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error.message);
        }

    }

}



const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;

        try {


            const rep = await fetchConToken(`events/${id}`, {}, 'DELETE');

            const body = await rep.json();

            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error.message);
        }


    }
}

const eventDeleted = () => ({ type: types.eventDeleted });


export const eventStartLoading = () => {
    return async (dispatch) => {

        const resp = await fetchConToken('events');
        const body = await resp.json();

        const events = prepareEvents(body.eventos);

        dispatch(eventLoaded(events));

        try {

        } catch (error) {
            console.log(error.message);
        }

    }



}


const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({
    type: types.eventLogout
})
