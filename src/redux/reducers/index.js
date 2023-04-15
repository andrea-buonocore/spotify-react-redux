const initialState = {
    selectedSong: {
        song: {},
        isSelected: false
    }
}

const MainReducer = (state = initialState, action) => {
    switch(action.type){

        case 'SHOW_IN_PLAYER':
            return {
                ...state,
                selectedSong: {
                    ...state.selectedSong,
                    song: action.payload,
                    isSelected:true
                } 
            }


        default: return state
    }
}

export default MainReducer;