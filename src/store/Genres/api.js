import { constants } from './constant';
import { axiosMethods } from 'common/function/AxiosMethod';
import { toast } from 'react-toastify';
import instanceRequest from "common/function/AxiosClient";

const Genres = {
    Get
}

function Get() {
    return async dispatch => {
        await dispatch({ type: constants.GET_REQUEST, });
        const url = `/api/v1/genre`;
        const response = await instanceRequest(url, axiosMethods.GET);
        try {
            if(response.success) {
                return await dispatch({ type: constants.GET_SUCCESS, payload: response.data });
            }
            else {
                await dispatch({ type: constants.GET_FAILURE, payload: response.message });
                return toast.error(response?.message);
            }
        }
        catch{
            const message = "Internal Server Error";
            toast.error(message);
            return await dispatch({ type: constants.GET_FAILURE, payload: message });
        }
    }
}

export { Genres };