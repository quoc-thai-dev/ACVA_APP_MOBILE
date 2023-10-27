import universityApi from "../../api/universityApi"
import types from "../types"


export const fetchUniversities = () => {
    return async (dispatch, getState) => {
        dispatch(fetchUniversitiesStart())
        try {
            const response = await universityApi.getAll();
            if (response && response.data) {
              const universities =  response.data.map(res => ({key: res.id, value: res.name}))
                dispatch(fetchUniversitySuccess(universities));
            }
        } catch (error) {
            dispatch(fetchUniversityFailed());
            console.log(error);
        }  
    }
}

export const fetchUniversitiesStart = () => {
    return {
        type: types.GET_UNIVERSITY_START,
    }
}

export const fetchUniversitySuccess =(data) => {
  return {
      type: types.GET_UNIVERSITY_SUCCESS,
      payload: data,
  } 
}

export const fetchUniversityFailed =() => {
    return {
        type: types.GET_UNIVERSITY_FAILED,
    } 
  }