'use sever'
export default async function getFoiForShift(foi: [], postlist: string) {
  let newlist = "";
  let foistr = foi.join();

  if (postlist.includes(foistr)) {
    newlist = postlist.replace(foistr + "||", "");
    newlist = postlist.replace("||" + foistr, "");
    newlist = newlist.replace(foistr, "");
  } else {
    newlist = postlist === "" ? foistr : postlist + '||' + foistr;
  };

  return (
    newlist
  )

} 