document.getElementById("btnPrint").addEventListener("click", printDiv, false);

function printDiv() {
    var printContents = document.getElementById("modalResult").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents + "<script>function print(){window.print(); window.location.reload(true);} window.onload=print;</script>";
    setTimeout(window.location.reload(true), 2000);
    window.print();
}