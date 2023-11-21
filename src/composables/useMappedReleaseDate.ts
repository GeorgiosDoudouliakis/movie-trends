import { readonly } from "vue";

export function useMappedReleaseDate() {
    const months: { [key: string]: string } = readonly({
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    });

    function mappedReleaseDate(date: string): string {
        const dateArr: string[] = date.split("-");
        return dateArr[2] + " " + months[`${dateArr[1]}`] + " " + dateArr[0];
    }

    return { mappedReleaseDate };
}