import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

export default function selectSquad(assignedfoi:any[]) {
    let list: any[] = [];

    const addToList = (name: string)=>{
        const listinput = document.getElementById("new-squad-input-list");
        let listsize = list.push(name.split(" ")[0]);

        listinput.nodeValue = list.join(",");
        console.log(list)
        

    }

    return (

        <div className="group">
        <input id="new-squad-input-list"type="text" title="Shift Personnel"  placeholder="Click to select an option..."
            className="w-full">
        </input>
        <div className="absolute opacity-0 group-hover:opacity-100 transition ease-in-out duration-700 w-36 border-2 border-slate-400 bg-slate-50">
            {assignedfoi.map((foi) => {
                const imageUrl = getStrapiMedia(
                    foi.url || '/uploads/revised_noi_logo2_942d6c26ae.png'
                );
                return (
                    <div className="hover:bg-slate-500 cursor-pointer"  data-option-name={foi.Name.split(" ")[0]} >
                    <div id={`option-${foi.NationsID}`} className="flex flex-row items-center p-1 h-6 w-6 gap-4 "
                    >
                        {imageUrl && (
                            <Image
                                alt="presentation"
                                width="75"
                                height="75"
                                className="object-contain items-center justify-center rounded-full"
                                src={imageUrl}
                            />
                        )}
                        <div id={`option-${foi.NationsID}-name`}>{foi.Name.split(" ")[0]}</div>
                    </div>
                    </div>


                );
            })}

        </div>
        </div>
    )
}