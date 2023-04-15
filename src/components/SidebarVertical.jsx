import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import AlbumCard from "./AlbumCard";
import MainNavbar from "./MainNavbar";

const SidebarVertical = () => {

    const [allSongs, setAllSongs] = useState([])
    const location = useLocation();
    console.log('locascion:', location);

    if (location.pathname !== '/') {
        let searchBar = document.getElementById('searchBar');
        searchBar.classList.add('d-none');
    }

    let headers = new Headers({
        // sets the headers
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
    })

    // function albumCard(songInfo) {
    //     // songInfo represents the info for the current song
    //     // creating the wrapper div
    //     return `
    //       <div className="col text-center" id=${songInfo.id}>
    //         <a href="/album_page.html?id=${songInfo.album.id}">
    //           <img className="img-fluid" src=${songInfo.album.cover_medium
    //         } alt="1" />
    //         </a>
    //         <p>
    //           <a href="/album_page.html?id=${songInfo.album.id}">
    //             Album: "${songInfo.album.title.length < 16
    //             ? `${songInfo.album.title}`
    //             : `${songInfo.album.title.substring(0, 16)}...`
    //         }"<br>
    //           </a>
    //           <a href="/artist_page.html?id=${songInfo.artist.id}">
    //             Artist: ${songInfo.artist.name}
    //           </a>
    //         </p>
    //       </div>`
    // }

    const search = async () => {
        const div = document.querySelector('#searchResults .row')
        div.innerHTML = ''
        let searchQuery = document.querySelector('#searchField').value // gets the value from the search box

        if (searchQuery.length > 2) {
            //if there's a value in the search box => fetch the information from rapidapi & display the result
            document.querySelector('#searchResults').style.display = 'block'

            try {
                let response = await fetch(
                    'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
                    searchQuery,
                    {
                        method: 'GET',
                        headers,
                    }
                ) // gets the information

                if (response.ok) {
                    let result = await response.json() // transforms the response to json
                    let songs = result.data
                    console.log('canzoni cercate:', songs)
                    setAllSongs(songs); // gets the songs info

                } else {
                    console.log('error')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            //else just hide the section!
            document.querySelector('#searchResults').style.display = 'none'
        }
    }


    return (
        <>

            <div className="col-2">
                <nav
                    className="navbar navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between"
                    id="sidebar"
                >
                    <div className="nav-container">
                        <Link to={'/'} className="navbar-brand">
                            <img
                                src="/img/Spotify_Logo.png"
                                alt="Spotify_Logo"
                                width={131}
                                height={40}
                            />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <ul>
                                    <li>
                                        <Link to={'/'} className="text-decoration-none">
                                            <a className="nav-item nav-link" href="#">
                                                <i className="fas fa-home fa-lg" />
                                                &nbsp; Home
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/favorites'} className="nav-item nav-link">
                                            <i className="fas fa-book-open fa-lg" />
                                            &nbsp; Your Library
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="input-group mt-3" id="searchBar">
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                id="searchField"
                                                placeholder="Search"
                                                aria-label="Search"
                                                aria-describedby="basic-addon2"
                                            />
                                            <div
                                                className="input-group-append"
                                                style={{ marginBottom: "4%" }}
                                            >
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    type="button"
                                                    id="button-addon1"
                                                    onClick={() => search()}
                                                >
                                                    GO
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="nav-btn">
                        <button className="btn signup-btn" type="button">
                            Sign Up
                        </button>
                        <button className="btn login-btn" type="button">
                            Login
                        </button>
                        <Link to={'*'}>Cookie Policy</Link> | <Link to={'*'}> Privacy</Link>
                    </div>
                </nav>
            </div>
            <div className="col-12 col-md-9 offset-md-3 mainPage">
                <div id="searchResults" style={{ display: "none" }}>
                        <h2>Search Results</h2>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
                        {
                            allSongs && (

                                allSongs.map((song, index) => {
                                    return (
                                        <AlbumCard key={index} albumInfo={song} />
                                        // <div className="col text-center" id={song.id} key={index}>
                                        //     <a href="/album_page.html?id=${songInfo.album.id}">
                                        //         <img className="img-fluid" src={song.album.cover_medium
                                        //         } alt="1" />
                                        //     </a>
                                        //     <p>
                                        //         <a href="/album_page.html?id=${songInfo.album.id}">
                                        //             Album: "{song.album.title}"<br />
                                        //         </a>
                                        //         <a href="/artist_page.html?id=${songInfo.artist.id}">
                                        //             Artist: {song.artist.name}
                                        //         </a>
                                        //     </p>
                                        // </div>
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

export default SidebarVertical;