document.getElementById("calcCheckDigit").addEventListener("click",calculatecd,false);

function calculatecd(){
    var barcodenum=document.getElementById("itmid").value;
	var mynum=barcodenum;
	if(isNaN(mynum) || mynum==0)
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