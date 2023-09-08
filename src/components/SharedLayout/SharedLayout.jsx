import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Routing from "@/components/Routing/Routing";

function SharedLayout() {
    return (
        <>
            <Header />
            <Routing/>
            <Outlet />
            <Footer/>
        </>
    )
}

export default SharedLayout;
