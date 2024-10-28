export function getStrapiURL(path = '') {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (url == null) {
        return null;
    }

    // Return the full URL if the media is hosted on an external provider
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Otherwise prepend the URL path with the Strapi URL
    return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };


    return date.toLocaleDateString('en-US', options);
}
export function formatDateShort(dateString: string) {
    
    const date = new Date(dateString);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = (1 + date.getDate()).toString().padStart(2, '0')

   
    return month + '/' + day + '/' + year;
}
export function formatMilitaryTime(timeString: string) {
    let suff = "AM"
    let hr: number = Number(timeString.split(":")[0]);
    if (hr > 12 ) {
        hr -= 12;
        suff = "PM"
    }
    return `${hr}:${timeString.split(":")[1]} ${suff}`
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(1), time));
