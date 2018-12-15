/**
 * 旋转图片
 * @param image         HTMLImageElement
 * @returns newImage    HTMLImageElement
 */
function rotateImage(image) {
    console.log('rotateImage');

    var width = image.width;
    var height = image.height;

    console.log(width);

    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext('2d');

    var newImage = new Image();

    //旋转图片操作
    EXIF.getData(image, function () {
        var orientation = EXIF.getTag(this, 'Orientation');
        // orientation = 6;//测试数据
        console.log('orientation:' + orientation);
        switch (orientation) {
            //正常状态
            case 1:
                console.log('旋转0°');
                // canvas.height = height;
                // canvas.width = width;
                newImage.src = image.src;
                break;
            //旋转90度
            case 6:
                console.log('旋转90°');
                canvas.height = width;
                canvas.width = height;
                ctx.rotate(Math.PI / 2);
                ctx.translate(0, -height);

                ctx.drawImage(image, 0, 0)
                imageDate = canvas.toDataURL('Image/jpeg', 1)
                newImage.src = imageDate;
                break;
            //旋转180°
            case 3:
                console.log('旋转180°');
                canvas.height = height;
                canvas.width = width;
                ctx.rotate(Math.PI);
                ctx.translate(-width, -height);

                ctx.drawImage(image, 0, 0)
                imageDate = canvas.toDataURL('Image/jpeg', 1)
                newImage.src = imageDate;
                break;
            //旋转270°
            case 8:
                console.log('旋转270°');
                canvas.height = width;
                canvas.width = height;
                ctx.rotate(-Math.PI / 2);
                ctx.translate(-height, 0);

                ctx.drawImage(image, 0, 0)
                imageDate = canvas.toDataURL('Image/jpeg', 1)
                newImage.src = imageDate;
                break;
            //undefined时不旋转
            case undefined:
                console.log('undefined  不旋转');
                newImage.src = image.src;
                break;
        }
    });
    return newImage;
}