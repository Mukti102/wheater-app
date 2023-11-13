const gloalState = {
    data : [],
}

const rootReducer = (state = gloalState,action) => {
        switch(action.type){
            case "GET_DATA":
                return {
                    ...state,
                    data : action.value
                }
            default :
            return state
        }
}
export default rootReducer