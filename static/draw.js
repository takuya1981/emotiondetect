function post() {
    var org = document.getElementById("canvas");
    var thm = document.getElementById("cantmb");
    var ctx = thm.getContext('2d');
    var img = new Image();
    img.onload = function(event){
        ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, 28, 28);
        var cArray = ctx.getImageData(0, 0, 28, 28).data;
        
        $.ajax({
            url: '/recognize',
            method: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(conv3(cArray)),
            success: (data) => {
                $('#result').text(data.result);
                $('#similarity1').text('cry       (' +  data.rate[0] + ')');
                $('#similarity2').text('smile     (' +  data.rate[1] + ')');
                $('#similarity3').text('surprised (' +  data.rate[2] + ')');
                $('#similarity4').text('angry     (' +  data.rate[3] + ')');
            }
        });
    }
    img.src = org.toDataURL();
}

function conv3(colorImg){
    var array =[];
    for (var i = 0; i < 28; i++){
        for (var j = 0; j < 28; j++){
            var idx1 = (i * 28 + j) * 4;
            var idx2 = (i * 28 + j) * 3;
            var r = colorImg[idx1];
            var g = colorImg[idx1+1];
            var b = colorImg[idx1+2];
            var v = parseInt(( r*30 + g*59 + b*11) / 100);
            array[idx2] = v;
            array[idx2+1] = v;
            array[idx2+2] = v;
        }
    }
    return array;
}
