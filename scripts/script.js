document.getElementById("calcCheckDigit").addEventListener("click", calculatecd, false);
document.getElementById("btnGenBarcodes").addEventListener("click", createbarcode, false);
document.getElementById("btnBarcodeClear").addEventListener("click", function() { $("#barcodeUserEntry").val(''); }, false);
//document.getElementById("btnGenQr").addEventListener("click", createqrcode, false);
document.getElementById("btnGenQr").addEventListener("click", CreateQR, false);
document.getElementById("btnClearQr").addEventListener("click", function() { $("#urlinput").val(''); }, false);
document.getElementById("btnValidateBarcode").addEventListener("click", ValidateBarcode, false);
document.getElementById("btnClearValBar").addEventListener("click", function() { $("#valBarcodeInput").val(''); }, false);
document.getElementById("btnDownload").addEventListener("click", exportTableToCSV, false);

function calculatecd() {
    var barcodenum = document.getElementById("itmid").value;
    var mynum = barcodenum;
    if (isNaN(mynum) || mynum == 0) {
        alert("Please enter the numerical values only");
    } else {
        var odd = 0;
        var sum = 0;
        for (var i = barcodenum.length - 1; i >= 0; i--) {
            if (odd == 0) {
                sum = parseInt(sum) + parseInt((barcodenum[i] * 3));
                odd = 1;
            } else {
                sum = parseInt(sum) + parseInt(barcodenum[i]);
                odd = 0;
            }
            // alert(sum);

        }
        sum = 10 - (sum % 10);
        if (sum == 10) {
            sum = 0;
        }

        // alert(barcodenum[0]);
        // alert(barcodenum.length);
        // alert("Check digit is: "+sum);
        document.getElementById("cditmid").innerHTML = barcodenum + "<span style=\"color:red;font-weight:bold;\">" + sum + "</span>";
        document.getElementById("finbar").style.display = "block";
        JsBarcode("#barcode", barcodenum + sum);
        $("#finbar").css('display', 'block');
        // ?alert("done");
    }
}

function returncd(bcde) {
    var odd = 0;
    var sum = 0;
    for (var i = bcde.length - 1; i >= 0; i--) {
        if (odd == 0) {
            sum = parseInt(sum) + parseInt((bcde[i] * 3));
            odd = 1;
        } else {
            sum = parseInt(sum) + parseInt(bcde[i]);
            odd = 0;
        }
        // alert(sum);

    }
    sum = 10 - (sum % 10);
    if (sum == 10) {
        sum = 0;
    }
    //alert(bcde+sum);
    return bcde + sum;

}

function createbarcode() {
    var lines = document.getElementById("barcodeUserEntry").value.split("\n");
    // var calcdfg=document.getElementById("fg_calcd").checked;
    //    alert(calcdfg);
    document.getElementById("modalResult").innerHTML = "<table id=\"tblResult\" class=\"w-100 table table-bordered\"></table>";
    if (lines[0] == "") {
        alert("Please enter the Item Ids for generating barcodes");
    } else {
        var isnumornot = 0;
        for (var j = 0; j < lines.length; j++) {
            if (isNaN(lines[j])) {
                isnumornot = 1;
            }
        }
        // alert(isnumornot);
        if (isnumornot == 0) {
            // var barcodeno="";
            document.getElementById("tblResult").innerHTML = "";
            for (var i = 0; i < lines.length;) {
                if (lines[i] != "") {
                    if (i != lines.length - 1) {
                        document.getElementById("tblResult").innerHTML += "<tr><td><svg id=\"barcode" + i + "\"></svg></td><td><svg id=\"barcode" + (i + 1) + "\"></svg></td></tr>";
                        //alert(document.getElementById("fg_calcd").checked);
                        if (document.getElementById("fg_calcd").checked) {
                            //alert("mhere");
                            JsBarcode("#barcode" + i, returncd(lines[i]));
                            JsBarcode("#barcode" + (i + 1), returncd(lines[i + 1]));
                        } else {
                            JsBarcode("#barcode" + i, lines[i]);
                            JsBarcode("#barcode" + (i + 1), lines[i + 1]);
                        }
                        i = i + 2;
                    } else {
                        document.getElementById("tblResult").innerHTML += "<tr><td><svg id=\"barcode" + i + "\"></svg></td><td></td></tr>";
                        if (document.getElementById("fg_calcd").checked) {
                            JsBarcode("#barcode" + i, returncd(lines[i]));
                        } else {
                            JsBarcode("#barcode" + i, lines[i]);
                        }

                        i++;
                    }
                } else {
                    i++;
                }
            }
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            document.getElementById("modalLabel").innerHTML = "Barcodes Generated at -- <span style='color:green;text-decoration:underline; font-size:medium;'>" + dateTime + "</span>";
            $("#btnDownload").css('display', 'none');
        } else {
            alert("Please enter numbers only");
        }
    }
}

//Reference "https://github.com/davidshimjs/qrcodejs"
function createqrcode() {
    //document.getElementById("qrtble").style.display="block";
    var lines = document.getElementById("urlinput").value.split("\n");
    document.getElementById("tblResult").innerHTML = "";
    if (lines[0] == "") {
        alert("Please enter the Item Ids for generating barcodes");
    } else {
        // var barcodeno="";
        for (var i = 0; i < lines.length;) {
            if (lines[i] != "") {
                if (i != lines.length - 1) {
                    document.getElementById("tblResult").innerHTML += "<tr><td><div class=\"qrholder\" id=\"qrbrcde" + i + "\"></div></td><td><div class=\"qrholder\" id=\"qrbrcde" + (i + 1) + "\"></div></td></tr>";
                    i = i + 2;

                } else {
                    document.getElementById("tblResult").innerHTML += "<tr><td><div class=\"qrholder\" id=\"qrbrcde" + i + "\"></div></td><td></td></tr>";
                    i++;
                }
            } else {
                i++;
            }
        }
        for (var j = 0; j < lines.length; j++) {
            if (lines[i] != "") {
                new QRCode(document.getElementById("qrbrcde" + j), lines[j]);
            }
        }
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        document.getElementById("modalLabel").innerHTML = "QR Codes Generated at -- <span style='color:green;text-decoration:underline; font-size:medium;'>" + dateTime + "</span>";

    }


}


function CreateQR() {
    //document.getElementById("qrtble").style.display="block";
    var lines = document.getElementById("urlinput").value.split("\n");
    document.getElementById("modalResult").innerHTML = "";
    if (lines[0] == "") {
        alert("Please enter the Item Ids for generating barcodes");
    } else {
        // var barcodeno="";
        if (document.getElementById("fg_showQR").checked) {
            for (var i = 0; i < lines.length;) {
                if (lines[i] != "") {
                    if (i != lines.length - 1) {
                        document.getElementById("modalResult").innerHTML += "<div class=\"row\"><div class=\"qr-img-container justify-content-center mb-5 col-md-6\" ><div class=\"d-flex justify-content-center\" id=\"qrbrcde" + i + "\"></div><p class=\"text-center\">" + lines[i] + "</p></div><div class=\"qr-img-container justify-content-center mb-5 col-md-6\" ><div class=\"d-flex justify-content-center\" id=\"qrbrcde" + (i + 1) + "\"></div><p class=\"text-center\">" + lines[i + 1] + "</p></div></div>";
                        i = i + 2;

                    } else {
                        document.getElementById("modalResult").innerHTML += "<div class=\"row\"><div class=\"qr-img-container justify-content-center col-md-12\"><div class=\"d-flex justify-content-center\" id=\"qrbrcde" + i + "\"></div><p class=\"text-center\">" + lines[i] + "</p></div></div>";
                        i++;
                    }
                } else {
                    i++;
                }
            }
        } else {
            for (var i = 0; i < lines.length;) {
                if (lines[i] != "") {
                    if (i != lines.length - 1) {
                        document.getElementById("modalResult").innerHTML += "<div class=\"row\"><div class=\"qr-img-container d-flex justify-content-center mb-5 col-md-6\" id=\"qrbrcde" + i + "\"></div><div class=\"qr-img-container d-flex justify-content-center mb-5 col-md-6\" id=\"qrbrcde" + (i + 1) + "\"></div></div>";
                        i = i + 2;

                    } else {
                        document.getElementById("modalResult").innerHTML += "<div class=\"row\"><div class=\"qr-img-container d-flex justify-content-center col-md-12\" id=\"qrbrcde" + i + "\"></div></div>";
                        i++;
                    }
                } else {
                    i++;
                }
            }
        }
        for (var j = 0; j < lines.length; j++) {
            if (lines[i] != "") {
                new QRCode(document.getElementById("qrbrcde" + j), lines[j]);
            }
        }
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        document.getElementById("modalLabel").innerHTML = "QR Codes Generated at -- <span style='color:green;text-decoration:underline; font-size:medium;'>" + dateTime + "</span>";
        $("#btnDownload").css('display', 'none');
    }


}


function ValidateBarcode() {
    var lines = document.getElementById("valBarcodeInput").value.split("\n");
    // var calcdfg=document.getElementById("fg_calcd").checked;
    //    alert(calcdfg);
    document.getElementById("modalResult").innerHTML = "<table id=\"tblResult\" class=\"w-100 table table-bordered\"></table>";
    document.getElementById("tblResult").innerHTML = "";

    if (lines[0] == "") {
        alert("Please enter the barcodes to validate or dont keep the first line empty");
    } else {
        var isnumornot = 0;
        for (var j = 0; j < lines.length; j++) {
            if (isNaN(lines[j])) {
                isnumornot = 1;
            }
        }
        // alert(isnumornot);
        if (isnumornot == 0) {
            // #ffe4e1
            document.getElementById("tblResult").innerHTML += "<tr style=\"background-color: #ffb4d9; height:30px; font-weight:bold; \"><td>User Input</td><td>System Corrected Barcode</td><td>Validation Status</td></tr>";
            var barcodeno = "";
            var inpbar = "";
            for (var i = 0; i < lines.length;) {
                if (lines[i] != "") {
                    inpbar = lines[i].substring(0, lines[i].length - 1);
                    barcodeno = returncd(inpbar);

                    if (barcodeno == lines[i]) {

                        document.getElementById("tblResult").innerHTML += "<tr><td>" + lines[i] + "</td><td>" + barcodeno + "</td><td style=\"color:#61B329;\">Correct</td></tr>";
                    } else {
                        document.getElementById("tblResult").innerHTML += "<tr><td>" + lines[i] + "</td><td>" + barcodeno + "</td><td style=\"color:#fd8b62;\">Incorrect</td></tr>";
                    }

                    i++;
                } else {
                    i++;
                }
            }
            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            document.getElementById("modalLabel").innerHTML = "Barcode Validation -- <span style='color:green;text-decoration:underline; font-size:medium;'>" + dateTime + "</span>";
            $("#btnDownload").css('display', 'block');
        } else {
            alert("Please enter numbers only");
        }
    }
}


function printDiv1() {
    var divToPrint = document.getElementById('modalResult');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function() { newWin.close(); }, 10);
}


function printDiv2() {
    var printContents = document.getElementById("modalResult").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    //document.body.innerHTML = originalContents;
    sleep(5000);
    window.location.reload(true);
}

function exportTableToCSV() {
    var today = new Date();
    var date = today.getDate() + (today.getMonth() + 1) + today.getFullYear();
    var time = today.getHours() + today.getMinutes() + today.getSeconds();
    var dateTime = date + ' ' + time;
    var filename = "ValidationResult" + dateTime + ".csv";
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [],
            cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}