import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

export default function Photos(assignedfoi:any[]) {
    
    return (
        <div className="flex flex-row  py-8 flex-wrap gap-1">

        {assignedfoi.map((foi) => {
            const imageUrl = getStrapiMedia(
                foi.url || '/uploads/FOI_Screenshot_2024_12_30_090233_061c20008a.jpg'
            );

            return (
                <div id={`preview-photo-${foi.id}`}
                    className="flex flex-col justify-between w-32 m-h-{[8.5rem] mx-auto bg-white border border-black  group hover:no-underline 
dark:bg-gray-900 rounded-2x2 overflow-hidden shadow-lg"
                >
                    {imageUrl && (
                        <Image
                            alt="presentation"
                            width="125"
                            height="200"
                            className="h-[10rem] w-[9rem] object-fill"
                            src={imageUrl}
                        />
                    )}
                    <div className="flex flex-col p-[.25] relative">
                        <h3 className="text-[.75rem] pb-1 text-nowrap font-semibold ">
                            {`${foi.Name.replace('null ', '')}`}
                        </h3>
                    </div>
                </div>
            );
        })}
    </div>

    )
}