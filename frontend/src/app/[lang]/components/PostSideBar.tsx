import Image from "next/image";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import formatUSNumber from "../utils/phoneformater";

export default function PostFOI(assignedfoi: any[],city: string) {
    const today = new Date();
    console.log(JSON.stringify(assignedfoi))

    return (
        <div id="post-builder" className="hidden p-2 text-xs fixed top-20 z-50 border-1 shadow-xl w-[80%] h-[80%] lg:w-[25%] lg:h-[85%] bg-gray-400/85 ">
            <section className="flex flex-col text-center">
                <div>National House Post Schedule</div>
                <div>2/9/2024 To 2/11/2024</div>
                <div>{city.replace('-', ' ').toUpperCase()}</div>
                <div className="text-[.5rem]  text-left">{formatDate(today.toDateString())}</div>
            </section>
            <section className="text-center border-y-2 h-20 border-slate-800">
                Lodging
                <form className="flex flex-col">
                    <input type="text" ></input>
                    <input type="text" ></input>
                    <input type="text" ></input>
                    <input type="text" ></input>
                </form>
            </section>
            <section className="text-center border-y-2 h-40 border-slate-800">
                List
                <div className={`grid justify-left grid-cols-4 gap-6   bg-white border-2  border-b-2 border-black`}>
                    <div>NAME</div><div>ID</div><div>Rank</div><div>PHONE</div>
                </div>
                {assignedfoi.map((foi) => {
                    return (
                        <div id={`preview-list-${foi.id}`}
                            className="grid justify-left grid-cols-4 gap-6 text-[.5rem] text-nowrap font-semibold  bg-white ">
                            <div className="text-left pl-1 "> {foi.Name.replace('null ', '')}</div>
                            <div> {foi.NationsID}</div>
                            <div className="text-left pl-2"> {foi.Rank}</div>
                            <div className="text-left"> {formatUSNumber(foi.PhoneNumber)}</div>
                        </div>
                    );
                })}

            </section>
            <section className="text-center border-y-1 border-slate-800">
                Schedule
                <form className="flex flex-col">
                    <input type="text" ></input>
                    <input type="text" ></input>
                    <input type="text" ></input>
                    <input type="text" ></input>
                </form>
            </section>

            <section className="flex flex-col text-center border-y-2 border-slate-400">
                Photos
                <div className="flex flex-row flex-wrap gap-1">

                    {assignedfoi.map((foi) => {
                        const imageUrl = getStrapiMedia(
                            foi.url || '/uploads/revised_noi_logo2_942d6c26ae.png'
                        );

                        return (
                            <div id={`preview-photo-${foi.id}`}

                                className="flex flex-col justify-between w-24 h-{[8.5rem] mx-auto bg-white border-2  border-white group hover:no-underline 
               dark:bg-gray-900 rounded-2x2 overflow-hidden shadow-lg"
                            >
                                {imageUrl && (
                                    <Image
                                        alt="presentation"
                                        width="100"
                                        height="100"
                                        className="object-contain"
                                        src={imageUrl}
                                    />
                                )}
                                <div className="flex flex-col p-[.25] relative">
                                    <h3 className="text-[.5rem] text-wrap font-semibold ">
                                        {`${foi.Name.replace('null ', '')}`}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

        </div>


    );
}