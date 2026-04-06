export const checkWeightFormat = (num: string) => {
        const regEx = /^[0-9]{1,3}([.,][0-9]{1,2})?$/ //Five digits, two of them optional decimals
        return regEx.test(num)
    }