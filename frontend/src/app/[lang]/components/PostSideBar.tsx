"use client"
import React, { useState, useRef } from "react";
import { formatDate } from "../utils/api-helpers";
import formatUSNumber from "../utils/phoneformater";
import selectSquad from "./ShiftSquad";
import Photos from "./SquadPhotos";
import Moment from 'react-moment';
import 'moment-timezone';
import html2pdf from "html2pdf.js";
import { PdfIcon } from "./svgs";


export default function PostFOI(assignedfoi: any[], city: string) {
    const today: Date = new Date();
    const [shiftdate, setShiftdate] = useState();
    const [shiftstart, setShiftstart] = useState("12:00:00");
    const [shiftend, setShiftend] = useState("12:00:00");
    const postbuilderstyle = `hidden flex flex-col  text-xs fixed top-20 z-50 border-1 border-slate-600 shadow-xl shadow-slate-600   w-[40%] `
    const page1style = `p-2 bg-gray-100/85 w-full min-h-[850px]`
    const page2style = `p-2 bg-gray-100/85 w-full h-[900px] absolute top-[1025px]`;
    

    let shiftcount = 1;
    const pagesRef = useRef(null);

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

    const handleGeneratePdf = (city: string) => {
        const moment = require('moment');
        const page2 = document.getElementById("page-2");
        const cardno = document.getElementById("card-64");
        const printrange = document.getElementById("print-range");
        const donotprint1 = document.getElementById("addshift");
        const donotprint2 = document.getElementById("addshift-next");
        const opt = {
            margin: 0.5,
            filename: `NH-Post-${city}-${moment().format('YYYYMMDDhhmmss')}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "portrait"
            },
            pagebreak: { mode: "avoid-all", after: '#page-1' }

        };

        if (donotprint1 != null && donotprint2 != null) {
            donotprint1.style.display = "none";
            donotprint2.style.display = "none";
        }
         //html2pdf(printrange).set(opt).save();
        //html2pdf().from(pagesRef.current).set(opt).save();
        html2pdf().set(opt).from(printrange).save();
    };

    const reportdates = function () {
        const startdatenodes = document.getElementsByName("shift-dates");
        const startdates = Array.from(startdatenodes);
        let daterange: any[] = [startdates[0]?.innerHTML, startdates[startdates.length - 1]?.innerHTML]

        return daterange
    }


    const addshiftsquad = function () {
        const moment = require('moment');
        const shiftsquad: HTMLElement = document.getElementById("new-squad-input-list") as HTMLElement;
        const newshift = document.getElementById("addshift");
        const newlist = document.getElementById("new-squad-input-list");
        let newdates = document.getElementById("headerreportdates");

        const newrow = `<tr id="new-shift-${shiftcount}" style="{paddin_bottom:1.5rem}"><td>${newlist?.innerHTML}</td><td name="shift-dates">${moment(shiftdate).format("L")}</td><td>${moment(shiftstart, "HH:mm").format("LT")}</td><td>${moment(shiftend, "HH:mm").format("LT")}</td></tr>`
        newshift?.insertAdjacentHTML("beforebegin", newrow)
        shiftcount += 1;
        const newdaterange = reportdates()
        if (newdates != null) {
            newdates.innerText = `${newdaterange[0]} To ${newdaterange[1]}`;
        }

        shiftsquad.textContent = "";
        //document.getElementById("addshift-squad").innerText = fulllist;

    }


    function viewpage(PDF = false) {
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



        <div id="post-builder" className={postbuilderstyle}>
            <div id="view-page-tab" onClick={() => { viewpage() }} className="absolute text-center hover:cursor-pointer text-xs h-4 w-16 -top-4  
            -ml-16 left-full bg-gray-100/85 rounded-tr-xl  rounded-tl-lg" >

                <span>Page-2</span>
            </div>
            <div id="print-page-tab" onClick={() => { handleGeneratePdf(city) }} className="absolute p-2 text-center hover:cursor-pointer m-auto text-white text-xs h-20 w-12   
            -ml-40 right-full bg-blue-700 rounded-lg hover:font-bold" >
                SAVE
                <span className="pt-4" >
                    <PdfIcon></PdfIcon>
                </span>
            </div>




            <div id="print-range" ref={pagesRef} className="flex flex-row h-[2500px]">
                <div id="page-1" className={page1style}>
                    <section className="flex flex-col h-[115px] text-center text-xl border-b-2 font-bold">
                        <div>National House Post Schedule</div>
                        <div id="headerreportdates" className="font-medium text-lg">{`TBD To TBD`}</div>
                        <div>{city.replace('-', ' ').toUpperCase()}</div>
                        <div className="text-[.75rem]  text-left">{formatDate(today.toDateString())}</div>
                    </section>
                    <section className="flex h-[10rem] pt-0 pb-0 top-0 items-center m-auto text-lg font-medium min-h-20 border-slate-800">
                        <table className="m-auto" >
                            <th><div className="pb-2 m-auto">Lodging</div></th>
                            <tbody>
                                <tr className="pb-2 w-full"><td><input className="w-full" type="text" placeholder="Name"></input></td></tr>
                                <tr className="pb-2 w-full"><td><input className="w-full" type="text" placeholder="Address"></input></td></tr>
                                <tr className=" pb-2"><td><input type="text" placeholder="Zip-Code"></input><input type="text" placeholder="Phone"></input></td></tr>
                            </tbody>
                        </table>



                    </section>
                    <section className="text-center  text-xl pt-2 font-bold border-y-2 min-h-72 border-slate-800">
                        <div className="pb-1">FOI</div>
                        <div className={`grid justify-left grid-cols-4 gap-6 text-base  bg-white border-2  border-b-2 border-black`}>
                            <div className="pb-2">NAME</div><div>ID</div><div>Rank</div><div>PHONE</div>
                        </div>
                        {assignedfoi.map((foi) => {
                            return (
                                <div id={`preview-list-${foi.id}`}
                                    className="grid justify-left grid-cols-4 gap-6 text-base text-nowrap font-semibold pb-1 bg-white ">
                                    <div className="text-left pl-1 "> {foi.Name.replace('null ', '')}</div>
                                    <div> {foi.NationsID}</div>
                                    <div className="text-left pl-2"> {foi.Rank}</div>
                                    <div className="text-left"> {formatUSNumber(foi.PhoneNumber)}</div>
                                </div>
                            );
                        })}

                    </section>
                    <section className="text-center text-xl max-h-20 font-bold border-y-1 border-slate-800">
                        <div className="pb-1">Schedule</div>
                        <form className="flex flex-col">
                            <table className="bg-white w-full text-center text-sm">

                                <th className="pb-2 w-[35%]">Squad</th><th className="w-[20%]">Date</th><th className="w-[20%]">Begin Time</th><th className="w-[20%]">End Time</th>

                                <tbody className="font-light border-black border-1">

                                    <tr id="addshift" className="border-1 border-black bg-slate-200">
                                        <td id="addshift-squad">
                                            {selectSquad(assignedfoi)}
                                        </td>

                                        <td id="addshift-date"><input name="shift-date" type="date" onChange={handleShiftDateChange} value={shiftdate}></input></td>
                                        <td id="addshift-start"><input name="shift-start" type="time" value={shiftstart} onChange={handleStartChange}></input></td>
                                        <td id="addshift-end"><input name="shift-end" type="time" value={shiftend} onChange={handleEndChange}></input></td>
                                    </tr>

                                    <div id="addshift-next" className="absolute bg-red-500 h-6 w-8 cursor-pointer rounded-r -right-6 -mt-6 text-[.65rem] font-light hover:font-medium" onClick={addshiftsquad}>NEXT</div>

                                </tbody>
                            </table>
                        </form>
   
                    </section>
                    <div className="absolute top-[975px] inset-x-0 pb-2 text-center font-bold">
                        Page 1
                    </div> 
                                         
                </div>

                <div id="page-2" className={page2style}>
                    <section id="post-potos" className="flex flex-col py-4 mx-auto h-full w-full text-center border-b-2 border-slate-400 ">
                        <div className="text-xl font-bold">Photos</div>
                        {Photos(assignedfoi)}
                    </section>
{/*                     <div className="bottom-0 inset-x-0  text-center font-bold">
                        Page 2
                    </div> */}
                </div>
            </div>
        </div>


    );
}