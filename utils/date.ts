export const convertDate = (date: string): string => {
    const formattedDate = new Date(date).toLocaleDateString("da-DK")
    return formattedDate
}