import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

export default function Photos(assignedfoi:any[]) {
    
    return (
        <div className="flex flex-row  py-8 flex-wrap gap-1">

        {assignedfoi.map((foi) => {
            const imageUrl = getStrapiMedia(
                foi.url || '/uploads/revised_noi_logo2_942d6c26ae.png'
            );

            return (
                <div id={`preview-photo-${foi.id}`}
                    className="flex flex-col justify-between w-32 h-{[8.5rem] mx-auto bg-white border-2  border-white group hover:no-underline 
dark:bg-gray-900 rounded-2x2 overflow-hidden shadow-lg"
                >
                    {imageUrl && (
                        <Image
                            alt="presentation"
                            width="200"
                            height="200"
                            className="object-contain"
                            src={imageUrl}
                        />
                    )}
                    <div className="flex flex-col p-[.25] relative">
                        <h3 className="text-[1rem] pb-1 text-wrap font-semibold ">
                            {`${foi.Name.replace('null ', '')}`}
                        </h3>
                    </div>
                </div>
            );
        })}
    </div>

    )
}