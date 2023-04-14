import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const AlbumPage = () => {

    const params = useParams();

    const [album, setAlbum] = useState(null);

    const start = async () => {

        let headers = new Headers({
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            "X-RapidAPI-Key":
                "c74a0a086emshf55ffb8dbdcb59ap17a486jsnb83bb4d3e387",
        });

        try {
            let response = await fetch(
                "https://striveschool-api.herokuapp.com/api/deezer/album/" +
                params.albumID,
                {
                    method: "GET",
                    headers,
                }
            )
            

            if (response.ok) {
                let album = await response.json(); // transforms the response into a JSON
                setAlbum(album);
            } else {
                document.querySelector("#img-container").innerHTML =
                    "NOT OK" + (await response.text());
            }
        } catch (exception) {
            // ex.: Url is not correct, Internal Server Error
            document.querySelector("#img-container").innerHTML = exception;
        }
    };

    useEffect(() => {
        start();
    }, [])


    return (
        <div class="col-12 col-md-9 offset-md-3 mainPage">
            {
                album && (

                    <div className="row">
                        <div className="col-md-3 pt-5 text-center" id="img-container">
                            <img src={album.cover_medium} className="card-img img-fluid" alt="Album" />
                            <div className="mt-4 text-center">
                                <p className="album-title">{album.title}</p>
                            </div>
                            <div className="text-center">
                                <Link to={`/artistPage/${album.artist.id}`}><p className="artist-name">{album.artist.name}</p></Link>
                            </div>
                            <div className="mt-4 text-center">
                                <button id="btnPlay" className="btn btn-success" type="button">Play</button>
                            </div>
                        </div>
                        <div className="col-md-8 p-5">
                            <div className="row">
                                <div className="col-md-10 mb-5" id="trackList">
                                    {
                                        album && (
                                            album.tracks.data.map((track, index) => {
                                                return (
                                                    <div className="py-3 trackHover" key={index}>
                                                        <a href="#" className="card-title trackHover px-3" style={{color: 'white'}} >{track.title}</a>
                                                        <small className="duration" style={{color: 'white'}}>{Math.floor(
                                                            parseInt(track.duration) / 60 // setting the duration minutes
                                                        )}:{parseInt(track.duration) % 60 < 10
                                                            ? "0" + (parseInt(track.duration) % 60) // checking che duration seconds, if they are less than 10 a 0 is prefixed
                                                            : parseInt(track.duration) % 60
                                                            }</small>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                )
            }
        </div>
    )
}

export default AlbumPage;