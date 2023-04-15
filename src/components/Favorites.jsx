import { useDispatch, useSelector } from "react-redux";
import SidebarVertical from "./SidebarVertical";

const Favorites = () => {
    const dispatch = useDispatch();
    const isStarred = useSelector(state => state.favorites.songs)
    console.log('isStarred:::', isStarred);

    const removeFromFavorites = (song) => {
        dispatch({
            type: 'REMOVE_FROM_FAVORITES',
            payload: song
        });
        alert(`${song.title} rimossa dai preferiti!`)
    }

    return (
        <>
            <SidebarVertical />
            <div className="col-12 col-md-9 offset-md-3 mainPage">
                <div className="row">
                    <div className="col-10">
                        {
                            (isStarred.length === 0) && (<h3 className="text-light my-5">You haven't added any songs to favorites yet.</h3>)
                        }
                        
                        {
                            isStarred &&
                            (
                                isStarred.map((song, index) => {
                                    return (
                                        <div className="py-3 pr-3 trackHover d-flex justify-content-between" key={index}>
                                            <div className="card-title trackHover px-3" style={{ color: 'white' }} >{song.title}</div>
                                            <div className="d-flex align-items-center">
                                                
                                                <i class="bi bi-heart-fill px-5" onClick={() => removeFromFavorites(song)}></i>
                                                <small className="duration" style={{ color: 'white' }}>{Math.floor(
                                                    parseInt(song.duration) / 60 // setting the duration minutes
                                                )}:{parseInt(song.duration) % 60 < 10
                                                    ? "0" + (parseInt(song.duration) % 60) // checking che duration seconds, if they are less than 10 a 0 is prefixed
                                                    : parseInt(song.duration) % 60
                                                    }</small>
                                            </div>
                                        </div>
                                    )
                                })
                            ) 
                            
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Favorites;