import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArtistPage = () => {

    const params = useParams();
    const [artist, setArtist] = useState();
    const [artistTracklist, setArtistTracklist] = useState()
    console.log('paramssss', params);

    const headers = new Headers({
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key":
            "222902beabmshb95a65b737cead6p1f3ac9jsn23ced94c0d20",
    });


    const findAlbums = async () => {
        let tracksResponse = await fetch(
            // await the fetch of the artist songs
            "https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
            artist.name,
            {
                method: "GET",
                headers,
            }
        );

        if (tracksResponse.ok) {
            let tracklist = await tracksResponse.json();
            setArtistTracklist(tracklist.data);

        }
    }

    const start = async () => {

        try {
            let response = await fetch(
                "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
                params.artistId,
                {
                    method: "GET",
                    headers,
                }
            );

            if (response.ok) {
                let artist = await response.json();
                setArtist(artist);

                // displaying the playButton
                let playButton = document.querySelector("#playButton");
                playButton.classList.remove("d-none");
                playButton.classList.add("d-inline");

                // displaying the followButton
                let followButton = document.querySelector("#followButton");
                followButton.classList.remove("d-none");
                followButton.classList.add("d-inline");

                findAlbums();

                
            } else {
                // something went wrong with the request --> i.e. headers missing, wrong HTTP Method
                document.querySelector("#apiLoaded").innerHTML =
                    "NOT OK" + (await response.text());
            }
        } catch (exception) {
            // ex.: Url is not correct, Internal Server Error
            document.querySelector("#apiLoaded").innerHTML = exception;
        }
    };

    useEffect(() => {
        start();
    }, [])

    return (
        <div className="col-12 col-md-9 offset-md-3 mainPage">
            <div className="row">
                <div className="col-12 col-md-10 col-lg-10 mt-5">
                    {
                        artist && (
                            <>
                                <h2 className="titleMain">{artist.name}</h2>
                                <div id="followers">{artist.nb_fan} followers</div>
                            </>
                        )
                    }
                    <div className="d-flex justify-content-center" id="button-container">
                        <button
                            className="btn btn-success mr-2 mainButton d-none"
                            id="playButton"
                        >
                            PLAY
                        </button>
                        <button
                            className="btn btn-outline-light mainButton d-none"
                            id="followButton"
                        >
                            FOLLOW
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-10 offset-1 col-md-10 col-lg-10 p-0">
                    <div className="mt-4 d-flex justify-content-start">
                        <h2 className="text-white font-weight-bold">Tracks</h2>
                    </div>
                    <div className="pt-5 mb-5">
                        <div className="row" id="apiLoaded">
                            {
                                artistTracklist && (
                                    artistTracklist.map((song, index) => {
                                        return (
                                            <div className="col-sm-auto col-md-auto text-center mb-5" key={index}>
                                                <a href="/album_page.html?id=${songInfo.album.id}">
                                                    <img className="img-fluid" src={song.album.cover_medium} />
                                                </a>
                                                <p className="text-truncate">
                                                    <a href="#">
                                                        Track: "{song.title}"
                                                    </a><br />
                                                    <a href="/album_page.html?id=${songInfo.album.id}">
                                                        Album: "{song.album.title.length}
                                                    </a>
                                                </p>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistPage;