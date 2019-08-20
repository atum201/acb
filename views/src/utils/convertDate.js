export default function convertDate(date) {
    var months = ["01", "02", "03", "04", "05", "06", "07",
        "08", "09", "10", "11", "12"];
    var d = new Date(date);
    var day = d.getDate();
    var month = months[d.getMonth()];
    const year = d.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    var datenew = year + '-' + month + '-' + day;
    return datenew;
}