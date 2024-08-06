import * as Action from '../redux/result_reducer'
import { postServerData } from '../helper/helper';

export const PushAnswer = ( result) => async (dispatch) => {
    try {
        await dispatch (Action.pushResultAction(result))
    } catch (error) {
        console.log(error);
    }
}
export const updateResult =  (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index))
    } catch (error) {
        console.log(error);
    }
}

/** insert user data */
export const usePublishResult = (resultdata) => {
    const { result, username } = resultdata;
    (async () =>{
        try {
            if(result !== [] && !username) throw new Error("Couldn't get Result");
            await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultdata, data => data);
        } catch (error) {
            console.log(error)
        }
    })();
}