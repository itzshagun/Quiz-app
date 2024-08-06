import { useEffect, useState } from "react"
//import data,{ answers } from "../database/data"
import { useDispatch } from "react-redux"

/**redux actions */
import * as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper.js"


/** fetch question hook to fetch api data and set value to the store */
export const useFetchQuestions = () => {
    const dispatch = useDispatch();
    const[ getData, setGetData] = useState({isLoading : false, apiData: [] , serverError : null})

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true }));

        /** async function to fetch backend data */
        (async () => {
            try {
                
                const [{questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data) => data)
                console.log({questions, answers });
                if(questions.length>0){
                    setGetData(prev => ({...prev, isLoading : false }));
                    setGetData(prev => ({...prev, apiData : {questions }}));

                    /**dispatch an action */
                    dispatch(Action.startExamAction({ question : questions, answers }))
                }else {
                    throw new Error(" No Question Available"); 
                }
            }catch (error) {
                setGetData(prev => ({...prev, isLoading : false }));
                setGetData(prev => ({...prev, serverError : error }));
            }
        })();
    }, [dispatch])
    return [getData, setGetData];
}   

/**MoveAction dispatch function */
export const MoveNextQuestion = ( ) => async (dispatch) =>  {
    try {
        dispatch(Action.moveNextAction());/**increase the trace value by 1 */ 
    } catch (error) {
        console.log(error);
    }
}
/** PrevAction Dispatch Function */
export const MovePrevQuestion = ( ) => async (dispatch) =>  {
    try {
        dispatch(Action.movePrevAction()); /**decrease the trace value by 1 */
    } catch (error) {
        console.log(error);
    }
}