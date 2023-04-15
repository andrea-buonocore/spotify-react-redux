const initialState = {
    selectedSong: {
        song: {}
    }
}

const MainReducer = (state = initialState, action) => {
    switch(action.type){

        case 'SHOW_IN_PLAYER':
            return {
                ...state,
                selectedSong: {
                    ...state.selectedSong,
                    song: action.payload
                } 
            }


        default: return state
    }
}

export default MainReducer;