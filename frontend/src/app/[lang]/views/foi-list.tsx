import Image from "next/image";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Foi {
  id: number;
  attributes: {
    FirstName: string;
    LastName: string;
    Middle: string;
    NationsID: string;
    Rank:string;  
    Email:string;
    PhoneNumber: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Photo:{
      data:{
        attributes:{
          url:string;
        }}
    }
  };
}

export default function FoiList({
  data: fois,
  children,
}: {
  data: Foi[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fois.map((foi) => {
          const imageUrl = getStrapiMedia(
            foi.attributes.Photo.data?.attributes.url||'http://localhost:1337/uploads/revised_noi_logo2_942d6c26ae.png'
          );

          return (
            <div
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
            >
              {imageUrl && (
                <Image
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover w-full h-44 "
                  src={imageUrl}
                />
              )}
              <div className="p-6 space-y-2 relative">
              {foi.attributes.Rank}
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {`${foi.attributes.FirstName} ${foi.attributes.Middle !== null ? foi.attributes.Middle :''} ${foi.attributes.LastName}`}
                </h3>
                <span className="text-xs dark:text-gray-400">
                      {foi.attributes.NationsID}
                    </span>
                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {formatDate(foi.attributes.createdAt)}
                  </span>
                  {foi.attributes.NationsID && (
                    <span className="text-xs dark:text-gray-400">
                      {foi.attributes.Rank}
                    </span>
                  )}
                </div>
                <p className="py-4">{foi.attributes.Email}</p>
              </div>
            </div>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
