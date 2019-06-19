$(document).ready(function(){
    
});

function openAdWin(){
    console.log("Open Ad");
    var w_width = 664;
    var w_height = 572;
    var x = (screen.width - w_width) / 2;
    var y = (screen.height - w_height) / 2;
    var feature = 'width=' + w_width + ', height=' + w_height + ', left=' + x + ', top=' + y;
    window.open('Ads.html', '', feature);
}