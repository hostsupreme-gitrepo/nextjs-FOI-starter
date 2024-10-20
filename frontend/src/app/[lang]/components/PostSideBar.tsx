import Image from "next/image";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import formatUSNumber from "../utils/phoneformater";

export default function PostFOI(assignedfoi: any[], city: string) {
    const today = new Date();
    //console.log(JSON.stringify(assignedfoi))


    function viewpage() {
        const tab = document.getElementById("view-page-tab");
        let newpage: string = tab?.textContent?.replace("Page-", "") || "1"

        let hidepage = "1";

        if (newpage === "1") {
            hidepage = "2";
        };

        tab.textContent = `Page-${hidepage}`

        document.getElementById(`page-${hidepage}`).style.display = "none";
        document.getElementById(`page-${newpage}`).style.display = "flex";

        return newpage;
    }


    return (



        <div id="post-builder" className="hidden p-2 text-xs fixed top-20 z-50 border-1 shadow-xl   w-[80%] min-h-[80%] lg:w-[33%] lg:h-[85%] bg-gray-400/85 ">
            <div id="view-page-tab" onClick={viewpage} className="absolute text-center hover:cursor-pointer text-xs h-4 w-16 -top-4  -ml-16 left-full bg-gray-400/85 rounded-t-xl  " >
                Page-2
            </div>
            <div className="absolute h-4 w-4 -top-4  -ml-[5.01rem] left-full bg-gray-400/85   "></div>
            <div className="absolute h-4 w-8 -top-4  -ml-[5.885rem] left-full bg-white rounded-br-xl  "></div>
            
            <div id="page-1" className="flex flex-col">
                <section className="flex flex-col text-center text-xl font-bold">
                    <div>National House Post Schedule</div>
                    <div>2/9/2024 To 2/11/2024</div>
                    <div>{city.replace('-', ' ').toUpperCase()}</div>
                    <div className="text-[.5rem]  text-left">{formatDate(today.toDateString())}</div>
                </section>
                <section className="text-center text-xl font-bold border-y-2 min-h-20 border-slate-800">
                    Lodging
                    <form className="flex flex-col items-center justify-left pb-2 w-[50%}">
                        <input type="text" placeholder="Name"></input>
                        <input type="text" placeholder="Address"></input>
                        <input type="text" placeholder="Zip-Code"></input>
                        <input type="text" placeholder="Phone"></input>
                    </form>
                </section>
                <section className="text-center text-xl pt-2 font-bold border-y-2 min-h-72 border-slate-800">
                    List
                    <div className={`grid justify-left grid-cols-4 gap-6 text-base  bg-white border-2  border-b-2 border-black`}>
                        <div>NAME</div><div>ID</div><div>Rank</div><div>PHONE</div>
                    </div>
                    {assignedfoi.map((foi) => {
                        return (
                            <div id={`preview-list-${foi.id}`}
                                className="grid justify-left grid-cols-4 gap-6 text-base text-nowrap font-semibold  bg-white ">
                                <div className="text-left pl-1 "> {foi.Name.replace('null ', '')}</div>
                                <div> {foi.NationsID}</div>
                                <div className="text-left pl-2"> {foi.Rank}</div>
                                <div className="text-left"> {formatUSNumber(foi.PhoneNumber)}</div>
                            </div>
                        );
                    })}

                </section>
                <section className="text-center text-xl font-bold border-y-1 border-slate-800">
                    Schedule
                    <table className="bg-white w-full text-center text-sm">
                        
                        <th className="w-[45%]">Squad</th><th className="w-[15%]">Date</th><th className="w-[20%]">Begin Time</th><th className="w-[20%]">End Time</th>
                        
                        <tbody className=" border-black border-1">
<tr>
                          <td>
                          
                            <select id="browsers">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                        </select>
                        
                            </td>
                          <td><input type="date" ></input></td>
                          <td><input type="time" ></input></td>
                          <td><input type="time" ></input></td>
                        </tr>
                        </tbody>
                    </table>
                    <form className="flex flex-col">
                        <input type="text" ></input>
                        <input type="text" ></input>
                        <input type="text" ></input>
                        <input type="text" ></input>
                    </form>
                </section>
                <div className="mx-auto text-center font-bold">
                    Page-1
                </div>
            </div>
            <div id="page-2" className="hidden flex-col items-center absolute top-0 w-[95%]">
                <section id="post-potos" className="flex flex-col py-4 mx-auto text-center border-y-2 border-slate-400">
                    <div className="text-xl font-bold">Photos</div>
                    <div className="flex flex-row  py-8 flex-wrap gap-1">

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
                <div className="flex flex-col font-bold">
                    Page-2
                </div>
            </div>
        </div>


    );
}