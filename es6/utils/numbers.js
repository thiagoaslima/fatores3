function pad(number) {
    return (number < 10) ? `0${number}` : number.toString(10);
}
;
export { pad };
