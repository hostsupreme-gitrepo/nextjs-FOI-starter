"use client"
import React from "react";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import formatUSNumber from "../utils/phoneformater";
import selectSquad from "./ShiftSquad";
import Photos from "./SquadPhotos";


export default function PostFOI(assignedfoi: any[], city: string) {
    const today = new Date();
    let shiftcount = 1;

    const reportdates = function () {
        const startdatenodes = document.getElementsByName("shift-dates");
        const startdates = Array.from(startdatenodes);
        let daterange: any[] = [startdates[0]?.innerHTML,startdates[startdates.length-1]?.innerHTML]

        return daterange
    }


    const addshiftsquad = function () {
        
        const parser = new DOMParser();
        const newshift = document.getElementById("addshift");
        const newlist = document.getElementById("new-squad-input-list");
        let newdates = document.getElementById("headerreportdates");
        const newrow = `<tr id="new-shift-${shiftcount}" ><td>${newlist?.innerHTML}</td><td name="shift-dates">11/${shiftcount}/2024</td><td>dg</td><td>tyhh</td></tr>`
        newshift?.insertAdjacentHTML("beforebegin", newrow)
        shiftcount += 1;
        const newdaterange = reportdates()
        newdates.innerText = `${newdaterange[0]} To ${newdaterange[1]}`;
    }


    function viewpage() {
        const tab = document.getElementById("view-page-tab") || " ";
        let newpage: string = tab?.textContent?.replace("Page-", "") || "1"

        let hidepage = "1";

        if (newpage === "1") {
            hidepage = "2";
        };
        //xdr
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
                    <div id="headerreportdates" >{`TBD To TBD`}</div>
                    <div>{city.replace('-', ' ').toUpperCase()}</div>
                    <div className="text-[.5rem]  text-left">{formatDate(today.toDateString())}</div>
                </section>
                <section className="text-center text-xl font-bold border-y-2 min-h-20 border-slate-800">
                    Lodging
                    <form className="flex flex-col items-center justify-left px-4 py-2 w-[55%}">
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
                    <form className="flex flex-col">
                        <table className="bg-white w-full text-center text-sm">

                            <th className="w-[45%]">Squad</th><th className="w-[15%]">Date</th><th className="w-[20%]">Begin Time</th><th className="w-[20%]">End Time</th>

                            <tbody className="font-light border-black border-1">
                                <tr id="addshift" className="">
                                    <td id="addshift-squad">
                                        {selectSquad(assignedfoi)}
                                    </td>
                                    <td id="addshift-date"><input name="shift-date" type="date" onChange={reportdates} ></input></td>
                                    <td id="addshift-start"><input name="shift-start" type="time" ></input></td>
                                    <td id="addshift-end"><input name="shift-end" type="time" ></input></td>
                                </tr>
                                <div className="absolute bg-red-500 h-6 w-8 cursor-pointer rounded-r -right-6 -mt-6 text-[.65rem] font-light hover:font-medium" onClick={addshiftsquad}>NEXT</div>
                            </tbody>
                        </table>
                    </form>
                </section>
                <div className="mx-auto text-center font-bold">
                    Page-1
                </div>
            </div>
            <div id="page-2" className="hidden flex-col items-center absolute top-0 w-[95%]">
                <section id="post-potos" className="flex flex-col py-4 mx-auto text-center border-y-2 border-slate-400">
                    <div className="text-xl font-bold">Photos</div>
                    {Photos(assignedfoi)}
                </section>
                <div className="flex flex-col font-bold">
                    Page-2
                </div>
            </div>
        </div>


    );
}