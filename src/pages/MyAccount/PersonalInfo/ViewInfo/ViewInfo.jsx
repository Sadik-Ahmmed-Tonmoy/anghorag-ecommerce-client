import { Link, ScrollRestoration } from "react-router-dom";
import useAuthUser from "../../../../hooks/useAuthUser";

const ViewInfo = () => {
    const {userData} = useAuthUser();
    return (
        <div className="md:w-10/12 lg:w-9/12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-semibold text-2xl  tracking-[0.48px] leading-[33.5px]">
                    Personal Info
                </h2>
                <Link to={"/my-account/personal-info/edit"}>
                    <button
                        className={`text-xs font-medium text-[#F40F6F] hover:text-white bg-[#FFF1F4] hover:bg-[#F40F6F] rounded-sm flex items-center gap-1 px-4 py-2 hover:cursor-pointer`}
                    >
                        Edit Profile
                    </button>
                </Link>
            </div>

            {/* form data start */}
            <div>
                <form>
                    <div>
                        <div className="mb-3 md:mb-6">
                            <label>
                                <span className="text-sm flex font-medium mb-3 text-black">
                                    Your Name
                                </span>
                            </label>
                            <input
                                type="text"
                                value={`${userData?.first_name} ${userData?.last_name}`}
                                disabled={true}
                                placeholder="First name"
                                className="p-2 w-full rounded-sm bg-white text-black border border-[#00000040]"
                            />
                        </div>
                        <div className=" mb-3 md:mb-6">
                            <label>
                                <span className="text-sm flex font-medium mb-3 text-black">
                                    Phone Number
                                </span>
                            </label>
                            <input
                                value={`${userData?.phone}`}
                                type="text"
                                disabled={true}
                                placeholder="Last name"
                                className="p-2 w-full rounded-sm bg-white text-black border border-[#00000040]"
                                required
                            />
                        </div>
                        <div className=" mb-3 md:mb-6">
                            <label>
                                <span className="text-sm flex font-medium mb-3 text-black">
                                    Email Address
                                </span>
                            </label>
                            <input
                                value={`${userData?.email}`}
                                disabled={true}
                                type="email"
                                placeholder="Phone number"
                                className="p-2 w-full rounded-sm bg-white text-black border border-[#00000040]"
                                required
                            />
                        </div>
                        <div className="mb-10 md:mb-24">
                            <label>
                                <span className="text-sm flex font-medium mb-3 text-black">
                                    Password
                                </span>
                            </label>
                            <input
                                defaultValue={"2313232132"}
                                disabled={true}
                                type="password"
                                placeholder="password"
                                className="p-2 w-full rounded-sm bg-white text-black border border-[#00000040]"
                                required
                            />
                        </div>
                    </div>
                </form>
            </div>
            {/* form data end */}
            <ScrollRestoration/>
        </div>
    );
};

export default ViewInfo;
