document.getElementById("calcCheckDigit").addEventListener("click", calculatecd, false);
document.getElementById("btnGenBarcodes").addEventListener("click", createbarcode, false);

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
        } else {
            alert("Please enter numbers only");
        }
    }
}