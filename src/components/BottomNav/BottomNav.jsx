import { useLocation, useParams } from "react-router-dom";
import banner from "../../assets/bottomNav/banner.png";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const BottomNav = ({ title }) => {

    const params = useParams();
    // 
    return (
        <div
            className="h-40 w-full bg-cover mb-5 md:mb-11 p-2 md:p-0 back"
            style={{
                backgroundImage: `url('${banner}')`,
                backgroundColor:
                    "rgba(255, 255, 255, 0.10)" /* 0.7 is the opacity value (adjust as needed) */,
            }}
        >
            <div className="flex items-center container mx-auto h-full">
                <div className="mx-2">
                    <Breadcrumbs  first={params?.category} second={params?.subItem} third={params?.subSubItem}/>
                    <h2 className="text-3xl font-semibold leading-[40px] text-black">
                        {title}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default BottomNav;
