export const convertDate = (date: string): string => {
    const formattedDate = new Date(date).toLocaleDateString("da-DK")
    return formattedDate
}

export function cycleMonth(currentMonthId: string, offsetNumber: number): string{
    const dateValues = currentMonthId.split("-")
    const currentYear = parseInt(dateValues[0])
    const currentMonth = parseInt(dateValues[1])

    var updatedMonth = currentMonth + offsetNumber
    var updatedYear = currentYear

    if (updatedMonth == 13){
        updatedMonth = 1
        updatedYear = currentYear + 1
    }
    if (updatedMonth == 0){
        updatedMonth = 12
        updatedYear = currentYear - 1
    }

    return updatedYear+"-"+updatedMonth+"-01"
}