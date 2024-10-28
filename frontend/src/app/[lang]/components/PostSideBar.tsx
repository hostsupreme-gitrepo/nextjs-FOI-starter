"use client"
import React from "react";
import { getStrapiMedia, formatDate,formatMilitaryTime,formatDateShort } from "../utils/api-helpers";
import formatUSNumber from "../utils/phoneformater";
import selectSquad from "./ShiftSquad";
import Photos from "./SquadPhotos";
import DatePickerModal from "./TimePickerModal";
import { useState } from "react";
import { OuterCurveLeft } from "./svgs";

export default function PostFOI(assignedfoi: any[], city: string) {
    const today: Date = new Date();
    const [shiftdate, setShiftdate] = useState();
    const [shiftstart, setShiftstart] = useState("12:00:00");
    const [shiftend, setShiftend] = useState("12:00:00");
    let shiftcount = 1;

    const handleShiftDateChange = (event: any) => {
        setShiftdate(event.target.value);
        console.log(shiftdate)
    };

    const handleStartChange = (event: any) => {
        setShiftstart(event.target.value);
    };
    const handleEndChange = (event: any) => {
        setShiftend(event.target.value);
    };

    const reportdates = function () {
        const startdatenodes = document.getElementsByName("shift-dates");
        const startdates = Array.from(startdatenodes);
        let daterange: any[] = [startdates[0]?.innerHTML, startdates[startdates.length - 1]?.innerHTML]

        return daterange
    }


    const addshiftsquad = function () {

        const parser = new DOMParser();
        const fulllist: string = document.getElementById("addshift-squad")?.innerText;
        const newshift = document.getElementById("addshift");
        const newlist = document.getElementById("new-squad-input-list");
        let newdates = document.getElementById("headerreportdates");
        const startt = new Date(shiftstart);
        const endt = new Date(shiftend);
        console.log(formatDateShort(shiftdate||""));
        const newrow = `<tr id="new-shift-${shiftcount}" ><td>${newlist?.innerHTML}</td><td name="shift-dates">${formatDateShort(shiftdate||"")}</td><td>${formatMilitaryTime(shiftstart)}</td><td>${formatMilitaryTime(shiftend)}</td></tr>`
        newshift?.insertAdjacentHTML("beforebegin", newrow)
        shiftcount += 1;
        const newdaterange = reportdates()
        newdates.innerText = `${newdaterange[0]} To ${newdaterange[1]}`;
        //document.getElementById("addshift-squad").innerText = fulllist;

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



        <div id="post-builder" className="hidden p-2 text-xs fixed top-20 z-50 border-1 border-slate-600 shadow-xl shadow-slate-600   w-[80%] min-h-[80%] lg:w-[33%] lg:h-[85%] bg-gray-100/85 ">
            <div id="view-page-tab" onClick={viewpage} className="absolute text-center hover:cursor-pointer text-xs h-4 w-16 -top-4  
            -ml-16 left-full bg-gray-100/85 rounded-tr-xl  rounded-tl-lg" >
             <span>Page-2</span>   
            </div>
            <div id="view-page-tab" onClick={viewpage} className="absolute pt-2 text-center hover:cursor-pointer m-auto text-white text-xs h-16 w-8   
            -ml-40 right-full bg-blue-700 rounded-lg hover:font-bold" >
             <span>Print to PDF</span>   
            </div>
            

            
        
        {/*style="fill:#9e9e9e;fill-opacity:0.914634;stroke:#000000;stroke-width:0.0481577;stroke-dasharray:none"*/}
            <div id="page-1" className="flex flex-col">
                <section className="flex flex-col text-center text-xl font-bold">
                    <div>National House Post Schedule</div>
                    <div id="headerreportdates" className="font-medium text-lg">{`TBD To TBD`}</div>
                    <div>{city.replace('-', ' ').toUpperCase()}</div>
                    <div className="text-[.75rem]  text-left">{formatDate(today.toDateString())}</div>
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
                                <tr id="addshift" className="border-1 border-black bg-slate-200">
                                    <td id="addshift-squad">
                                        {selectSquad(assignedfoi)}
                                    </td>
                                    <td id="addshift-date"><input name="shift-date" type="date" onChange={handleShiftDateChange} value={shiftdate}></input></td>
                                    <td id="addshift-start"><input name="shift-start" type="time" value={shiftstart} onChange={handleStartChange}></input></td>
                                    <td id="addshift-end"><input name="shift-end" type="time" value={shiftend} onChange={handleEndChange}></input></td>
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
                <section id="post-potos" className="flex flex-col py-4 mx-auto text-center border-b-2 border-slate-400">
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