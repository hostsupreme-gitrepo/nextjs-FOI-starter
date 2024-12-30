import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";

export default function selectSquad(assignedfoi: any[]) {
    let list: any[] = [];

    const buildshiftlist = (name: string, id: string) => {
        let grayscale, opacity;
        const listfill = document.getElementById("new-squad-input-list");
        const option = document.getElementById(id);
        const namepos = list.findIndex(checkName);

        if (namepos === -1) {
            list.push(name)
            grayscale = "grayscale(1)";
            opacity = "0.5"
        } else {
            list.splice(namepos, 1);
            grayscale = "grayscale(0)";
            opacity = "1"

        }

        function checkName(fname: string) {
            return fname === name;
        }
        if (option != null) {
            option.style.filter = grayscale;
            option.style.opacity = opacity;
        }
        if (listfill != null) {
            listfill.innerText = list.join(", ") || "";
        }


        return name;

    }

    return (

        <div className="group">
            <div id="new-squad-input-list" title="Shift Personnel" className="w-full">
                {list.join(",")}
            </div>
            <div className="absolute opacity-0 group-hover:opacity-100 transition ease-in-out duration-700 w-36 border-2 border-slate-400 bg-slate-50">
                {assignedfoi.map((foi) => {
                    const shiftname = foi.Name.split(" ").slice(0, -1).join(" ").replace(" null", "");
                    const imageUrl = getStrapiMedia(
                        foi.url || '/uploads/FOI_Screenshot_2024_12_30_090233_061c20008a.jpg'
                    );
                    return (

                        <div className="hover:bg-slate-500 cursor-pointer" data-option-name={foi.Name.split(" ")[0]}
                        >
                            <div id={`option-${foi.NationsID}`} className="flex flex-row items-center p-1 h-6 w-6 gap-4 "
                                onClick={(e: any) => buildshiftlist(shiftname, `option-${foi.NationsID}`)}>
                                {imageUrl && (
                                    <Image
                                        alt="presentation"
                                        width="75"
                                        height="75"
                                        className="object-contain items-center justify-center rounded-full"
                                        src={imageUrl}
                                    />
                                )}
                                <div id={`option-${foi.NationsID}-name`} className="w-full text-nowrap ">{shiftname}</div>
                            </div>
                        </div>


                    );
                })}

            </div>
        </div>
    )
}