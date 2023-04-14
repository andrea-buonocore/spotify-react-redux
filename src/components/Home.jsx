import Main from "./Main";
import Player from "./Player";
import SidebarVertical from "./SidebarVertical";

const Home = () => {

    return (
        <div className="container-fluid">
            <div className="row">
                <SidebarVertical />
                <Main />
            </div>
        </div>
    )

}

export default Home;