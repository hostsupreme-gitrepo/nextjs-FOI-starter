import Image from "next/image";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import { useState, useEffect, useCallback } from 'react'
import CheckBoxWithLabel from "../components/CheckboxwithLabel";
import getFoiForShift from "../actions/ShiftFOI"
import PostFOI from "../components/PostSideBar";

interface Foi {
  id: number;
  attributes: {
    FirstName: string;
    LastName: string;
    Middle: string;
    NationsID: string;
    Rank: string;
    Email: string;
    PhoneNumber: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Photo: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  };
}

function formatUSNumber(entry: string) {
  // @ts-ignore: Object is possibly 'null'.
  const match = entry
    .replace(/\D+/g, '').replace(/^1/, '')
    .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
  const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match
  const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : ''
  const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : ''
  return `${part1}${part2}${part3}`
}


export default function FoiList({
  data: fois,
  children,
}: {
  data: Foi[];
  children?: React.ReactNode;
}) {

  const cols = fois.length >= 5 ? 5 : fois.length;
  const [poststarted, setPoststarted] = useState(false)
  const [postfoi, setPostfoi] = useState("")


  return (
    <section className="container p-4 mx-auto space-y-6 sm:space-y-12">
      {PostFOI(postfoi,fois)}
      <div className="w-[50%] ml-[25%] bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="font-bold">Click any FOI</p>
        <p className="text-sm">To start a new post schedule.</p>
      </div>
      <div className={`grid justify-center grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-5 `}>
        {fois.map((foi) => {
          const imageUrl = getStrapiMedia(
            foi.attributes.Photo.data?.attributes.url || '/uploads/revised_noi_logo2_942d6c26ae.png'
          );


          const selectfoi = useCallback(async () => {
            const shiftfoi = [
              `${foi.attributes.FirstName} ${foi.attributes.Middle === "null" ? "" : foi.attributes.Middle} ${foi.attributes.LastName}`,
              foi.attributes.NationsID,
              foi.attributes.Rank,
              foi.attributes.PhoneNumber,
              foi.attributes.Photo.data.attributes.url
            ]
            const foilist = await getFoiForShift(shiftfoi, postfoi)
            setPostfoi(foilist)
            const foicard = document.getElementById(`card-${foi.id}`)!;
            const pendingshift = document.getElementById(`pending-${foi.id}`)!;

            const children = pendingshift!.childNodes;

            if (children[0].textContent === 'Pending') {
              foicard.style.borderColor = 'white'
              pendingshift.style.backgroundColor = 'white'
              children[0].textContent = ''
            } else {
              foicard.style.borderColor = 'red'
              pendingshift.style.backgroundColor = 'red'
              children[0].textContent = 'Pending'
            }

            document.getElementById('post-builder')!.style.display = 'block';

            if (foilist.length === 0) {
              document.getElementById('post-builder')!.style.display = 'none';
            }

          }, [postfoi]);


          return (
            <div id={`card-${foi.id}`} onClick={selectfoi}
              className="flex flex-col w-full mx-auto border-2 border-white group hover:no-underline 
              focus:no-underline dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
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
              <div className="flex flex-col px-4 py-2  relative">

                <h3 className="text-xl font-semibold ">
                  {`${foi.attributes.FirstName} ${foi.attributes.Middle !== null ? foi.attributes.Middle : ''}`}
                  <br></br>{`${foi.attributes.LastName}`}
                </h3>
                <div>
                  {`${foi.attributes.Rank}  `}
                  <span className="text-xs dark:text-gray-400">
                    {foi.attributes.NationsID}
                  </span>
                </div>
                <div className="flex flex-col items-baseline">
                  <p className="text-xs py-1">
                    {formatUSNumber(foi.attributes.PhoneNumber) || 'No Phone'} {foi.attributes.Email || 'No Email'}</p>
                </div>
              </div>
              <div id={`pending-${foi.id}`} className="w-full h-4 animate-pulse text-center bg-white text-white text-[0.5rem] " >
                <span className="font-semibold "></span>
              </div>
            </div>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
