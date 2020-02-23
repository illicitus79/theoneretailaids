// var resdiv=document.getElementById(finbar);
// resdiv.style.diplay=none;
// var calculatecd=function(){

// }

//Added Validate barcode feature - 4th May 2018
function calculatecd(){

	var barcodenum=document.getElementById("itmid").value;
	var mynum=barcodenum;
	if(isNaN(mynum))
	{
		alert("Please enter the numerical values only");
	}
	else
	{
		var odd=0;
		var sum=0;
		for(var i=barcodenum.length-1;i>=0;i--)
		{
			if(odd==0)
			{
				sum=parseInt(sum) + parseInt((barcodenum[i]*3));
				odd=1;
			}
			else
			{
				sum=parseInt(sum) + parseInt(barcodenum[i]);
				odd=0;				
			}
			// alert(sum);

		}
		sum=10-(sum%10);
		if(sum==10)
		{
			sum=0;
		}
		
		// alert(barcodenum[0]);
		// alert(barcodenum.length);
		// alert("Check digit is: "+sum);
		document.getElementById("cditmid").innerHTML=barcodenum+"<span style=\"color:red;font-weight:bold;\">"+sum+"</span>";
		document.getElementById("finbar").style.display="block";
		JsBarcode("#barcode", barcodenum+sum);
		$("#finbar").css('display','block');
	    // ?alert("done");
	}
}

function returncd(bcde)
{
	var odd=0;
	var sum=0;
	for(var i=bcde.length-1;i>=0;i--)
	{
		if(odd==0)
		{
			sum=parseInt(sum) + parseInt((bcde[i]*3));
			odd=1;
		}
		else
		{
			sum=parseInt(sum) + parseInt(bcde[i]);
			odd=0;				
		}
			// alert(sum);

		}
		sum=10-(sum%10);
		if(sum==10)
		{
			sum=0;
		}
		//alert(bcde+sum);
		return bcde+sum;
	}

function createbarcode()
{
	var lines = document.getElementById("itminput").value.split("\n");
	// var calcdfg=document.getElementById("fg_calcd").checked;
 //    alert(calcdfg);
	if(lines[0]=="")
	{
		alert("Please enter the Item Ids for generating barcodes");
	}
	else
	{
		var isnumornot=0;
		for (var j=0;j<lines.length;j++)
		{
			if(isNaN(lines[j]))
			{
				isnumornot=1;
			}
		}
		// alert(isnumornot);
		if(isnumornot==0)
		{
			// var barcodeno="";
			for(var i = 0;i < lines.length;)
			{
				if(lines[i]!="")
				{
					if(i!=lines.length-1)
					{
						document.getElementById("tblBarcde").innerHTML+="<tr><td><svg id=\"barcode"+i+"\"></svg></td><td><svg id=\"barcode"+(i+1)+"\"></svg></td></tr>";
						//alert(document.getElementById("fg_calcd").checked);
						if(document.getElementById("fg_calcd").checked)
						{
							//alert("mhere");
							JsBarcode("#barcode"+i, returncd(lines[i]));
							JsBarcode("#barcode"+(i+1), returncd(lines[i+1]));
						}
						else
						{
							JsBarcode("#barcode"+i, lines[i]);
							JsBarcode("#barcode"+(i+1), lines[i+1]);
						}
						i=i+2;
					}
					else
					{
						document.getElementById("tblBarcde").innerHTML+="<tr><td><svg id=\"barcode"+i+"\"></svg></td><td></td></tr>";
						if(document.getElementById("fg_calcd").checked)
						{
							JsBarcode("#barcode"+i, returncd(lines[i]));
						}
						else
						{
							JsBarcode("#barcode"+i, lines[i]);
						}
						
						i++;
					}
				}
				else
				{
					i++;
				}
			}
			document.getElementById("printbtn").style.display="block";
			document.getElementById("usrin").style.display="none";
			document.getElementById("tblBarcde").style.display="block";
		}
		else
		{
			alert("Please enter numbers only");
		}
	}
}

function valbarcd(){
	var lines = document.getElementById("barvalinput").value.split("\n");
	// var calcdfg=document.getElementById("fg_calcd").checked;
 //    alert(calcdfg);
	if(lines[0]=="")
	{
		alert("Please enter the barcodes to validate or dont keep the first line empty");
	}
	else
	{
		var isnumornot=0;
		for (var j=0;j<lines.length;j++)
		{
			if(isNaN(lines[j]))
			{
				isnumornot=1;
			}
		}
		// alert(isnumornot);
		if(isnumornot==0)
		{
			// #ffe4e1
			document.getElementById("cdvaltbl").innerHTML+="<tr style=\"background-color: #ffb4d9; height:30px; font-weight:bold; \"><td>User Input</td><td>System Corrected Barcode</td><td>Validation Status</td></tr>";
			var barcodeno="";
			var inpbar="";
			for(var i = 0;i < lines.length;)
			{
				if(lines[i]!="")
				{
					inpbar=lines[i].substring(0,lines[i].length-1);
					barcodeno=returncd(inpbar);
					
					if(barcodeno==lines[i])
					{

						document.getElementById("cdvaltbl").innerHTML+="<tr><td>"+lines[i]+"</td><td>"+barcodeno+"</td><td style=\"color:#61B329;\">Correct</td></tr>";
					}
					else
					{
						document.getElementById("cdvaltbl").innerHTML+="<tr><td>"+lines[i]+"</td><td>"+barcodeno+"</td><td style=\"color:#fd8b62;\">Incorrect</td></tr>";
					}

					i++;
				}
				else
				{
					i++;
				}
			}
			document.getElementById("printbtn").style.display="block";
			document.getElementById("barvalinput").style.display="none";
			document.getElementById("cdvaltbl").style.display="block";
			document.getElementById("forvalbar").style.display="none";
			document.getElementById("expdata").style.display="block";
			document.getElementById("cdres").style.display="block";
		}
		else
		{
			alert("Please enter numbers only");
		}
	}
}

function createqrcode(){
	document.getElementById("qrtble").style.display="block";
	var lines = document.getElementById("urlinput").value.split("\n");
	document.getElementById("qrtble").innerHTML="";
	if(lines[0]=="")
	{
		alert("Please enter the Item Ids for generating barcodes");
	}
	else
	{
			// var barcodeno="";
			for(var i = 0;i < lines.length;)
			{
				if(lines[i]!="")
				{
					if(i!=lines.length-1)
					{
						document.getElementById("qrtble").innerHTML+="<table><tr><td><div class=\"qrholder\" id=\"qrbrcde"+i+"\"></div></td><td><div class=\"qrholder\" id=\"qrbrcde"+(i+1)+"\"></div></td></tr></table>";
						//alert(document.getElementById("fg_calcd").checked);
						 new QRCode(document.getElementById("qrbrcde"+i), lines[i]);
						 // alert("qrbrcde"+(i+1));
						 // alert(lines[i+1]);
						 new QRCode(document.getElementById("qrbrcde"+(i+1)), lines[i+1]);
						i=i+2;
					}
					else
					{
						// alert("already in func");
						document.getElementById("qrtble").innerHTML+="<table><tr><td><div class=\"qrholder\" id=\"qrbrcde"+i+"\"></div></td><td></td></tr></table>";
						//jquery("#qrbrcde"+i).qrcode(lines[i]);

						//Reference "https://github.com/davidshimjs/qrcodejs"
						 new QRCode(document.getElementById("qrbrcde"+i), lines[i]);
						i++;
					}
				}
				else
				{
					i++;
				}
			}

			
			document.getElementById("printbtnqr").style.display="block";
			document.getElementById("forqr").style.display="none";
			//alert("");
		}


	}


function printdiv(){
	document.getElementById("printbtn").style.display="none";
	var printContents = document.getElementById("scrbargen").innerHTML;
	document.getElementById("mymodal").style.display="none";
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	//document.body.innerHTML = originalContents;
	window.location.href="main.html";
}

function printdiv1(){
	document.getElementById("printbtnqr").style.display="none";
	var printContents = document.getElementById("scrqrcgen").innerHTML;
	document.getElementById("mymodal").style.display="none";
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	//document.body.innerHTML = originalContents;
	window.location.href="main.html";
}

//experimental ************************************************************************
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

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
function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}


//experimental***************************************************


function showcalccd(){
	document.getElementById("calccheckd").style.display="block";
	document.getElementById("imgslde").style.display="none";
	document.getElementById("barcgen").style.display="none";
}


function showbargen(){
	document.getElementById("imgslde").style.display="none";
	document.getElementById("barcgen").style.display="block";
	document.getElementById("calccheckd").style.display="none";
	document.getElementById("usrin").style.display="block";
	document.getElementById("tblBarcde").style.display="none";
	document.getElementById("printbtn").style.display="none";
	document.getElementById("tblBarcde").innerHTML="";

}



// var myIndex = 0;
// carousel();

// function carousel() {
// 	var i;
// 	var x = document.getElementsByClassName("mySlides");
// 	for (i = 0; i < x.length; i++) {
// 		x[i].style.display = "none";  
// 	}
// 	myIndex++;
// 	if (myIndex > x.length) {myIndex = 1}    
// 		x[myIndex-1].style.display = "block";  
// 	setTimeout(carousel, 9000);    
// }



// Get the modal
var modal = document.getElementById('mymodal');

// Get the button that opens the modal
var calbarbtn = document.getElementById("lnkcalbar");
var getbarbtn=document.getElementById("lnkbargen");
var getqrbarbtn=document.getElementById("lnkqrbargen");
var lnkvalbarcd=document.getElementById("lnkvalbarcd");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var calbarcd=document.getElementById("calbarcd");
var scrbargen=document.getElementById("scrbargen");
var scrqrcgen=document.getElementById("scrqrcgen");
var scrchkdigval=document.getElementById("scrchkdigval");

// When the user clicks the button, open the modal 
calbarbtn.onclick = function() {
	document.getElementById("itmid").value='';
	modal.style.display = "block";
	calbarcd.style.display="block";
	document.getElementById("cditmid").innerHTML="";
	document.getElementById("finbar").style.display="none";
	scrbargen.style.display="none";
	scrqrcgen.style.display="none";
	scrchkdigval.style.display="none";
}

getbarbtn.onclick=function(){
	calbarcd.style.display="none";
	modal.style.display="block";
	scrbargen.style.display="block";
	scrqrcgen.style.display="none";
	scrchkdigval.style.display="none";
	document.getElementById("printbtn").style.display="none";
	document.getElementById("usrin").style.display="block";
	document.getElementById("tblBarcde").style.display="none";
	document.getElementById("itminput").value='';
	document.getElementById("tblBarcde").innerHTML="";
}

getqrbarbtn.onclick=function(){
	calbarcd.style.display="none";
	modal.style.display="block";
	scrbargen.style.display="none";
	scrqrcgen.style.display="block";
	scrchkdigval.style.display="none";
	document.getElementById("printbtnqr").style.display="none";
	document.getElementById("forqr").style.display="block";
	document.getElementById("qrtble").style.display="none";
	document.getElementById("urlinput").value='';
	document.getElementById("qrtble").innerHTML="";
}


lnkvalbarcd.onclick=function(){
	calbarcd.style.display="none";
	modal.style.display="block";
	scrbargen.style.display="none";
	scrqrcgen.style.display="none";
	scrchkdigval.style.display="block";
	document.getElementById("printbtnqr").style.display="none";
	document.getElementById("forvalbar").style.display="block";
	document.getElementById("cdvaltbl").style.display="none";
	document.getElementById("barvalinput").style.display="block";
	document.getElementById("barvalinput").value='';
	document.getElementById("cdvaltbl").innerHTML="";
	document.getElementById("expdata").style.display="none";
	document.getElementById("cdres").style.display="none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}


document.getElementsByClassName("close")[1].onclick=function(){
	modal.style.display="none";
}

document.getElementsByClassName("close")[2].onclick=function(){
	modal.style.display="none";
}

document.getElementsByClassName("close")[3].onclick=function(){
	modal.style.display="none";
}