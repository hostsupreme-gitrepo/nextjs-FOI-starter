export default function PostFOI(assignedfoi: string,fois: object) {
    const foilist = assignedfoi.split("||")
    
    return (
        <div id="post-builder" className="hidden text-xs fixed top-20 z-50 border-1 shadow-xl w-[80%] h-[80%] lg:w-[25%] lg:h-[50%] bg-gray-400/65 ">
           { `${foilist}

            
            `}
           {/*JSON.stringify(fois)*/}
           {/* {fois.filter((foi) => {})} */}
    
        </div>
    );
}