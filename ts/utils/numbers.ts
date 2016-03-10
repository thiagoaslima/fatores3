function pad(number: number):string {
    return (number < 10) ?  `0${number}` : number.toString(10);
};

export {
    pad
}