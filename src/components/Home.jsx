import Main from "./Main";
import Player from "./Player";
import SidebarVertical from "./SidebarVertical";

const Home = () => {

    return (
        <div className="container-fluid">
            <div className="row">
                {/*SIDEBAR VERTICAL*/}
                <SidebarVertical/>
                {/*END SIDEBAR VERTICAL*/}
                {/*MAIN*/}
                <Main/>
                {/*END MAIN*/}
                <Player/>
            </div>
        </div>
    )

}

export default Home;