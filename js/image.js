/**
 * 转载来自：https://blog.csdn.net/qq_25237107/article/details/69292374
 */

/**
 * 检查文件是否为图像类型
 * @param files         FileList
 * @returns file        File
 */
function checkFile(files) {
    console.log(files);
    var file = files[0];
    //使用正则表达式匹配判断
    if (!/image\/\w+/.test(file.type)) {
        return false;
    }
    return file;
}

/**
 * 判断图片是否需要压缩
 * @param image          HTMLImageElement
 * @param imageSize      int
 * @returns {*}          HTMLImageElement
 */
function judgeCompress(image, imageSize) {

    //判断图片是否大于300000 bit
    var threshold = 300000; //阈值,可根据实际情况调整
    console.log('imageSize:' + imageSize);
    if (imageSize > threshold) {
        var imageData = compress(image);

        var newImage = new Image();
        newImage.src = imageData;
        return newImage;
    } else {
        return image;
    }
}

/**
 *压缩图片
 * @param image         HTMLImageElement
 * @returns {string}    base64格式图像
 */
function compress(image) {
    console.log('compress');
    //console.log(image)

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var imageLength = image.src.length;
    var width = image.width;
    var height = image.height;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, width, height);

    //压缩操作
    var quality = 0.1; //图片质量  范围：0<quality<=1 根据实际需求调正
    var imageData = canvas.toDataURL("image/jpeg", quality);

    console.log("压缩前：" + imageLength);
    console.log("压缩后：" + imageData.length);
    console.log("压缩率：" + ~~(100 * (imageLength - imageData.length) / imageLength) + "%");
    return imageData;
}

/**
 * 旋转图片
 * @param image         HTMLImageElement
 * @returns newImage    HTMLImageElement
 */
function rotateImage(image, callback) {
    console.log('rotateImage');

    var width = image.width;
    var height = image.height;

    console.log(width);

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');

    var newImage = new Image();

    //旋转图片操作
    EXIF.getData(image, function () {
        var orientation = EXIF.getTag(this, 'Orientation');
        // orientation = 6;//测试数据
        console.log('orientation:' + orientation);
        switch (orientation) {
            //正常状态
            case 0:
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
                
                ctx.drawImage(image, 0, 0);
                imageDate = canvas.toDataURL('Image/jpeg', 1);
                newImage.src = imageDate;
                break;

            //旋转180°
            case 3:
                console.log('旋转180°');
                canvas.height = height;
                canvas.width = width;
                ctx.rotate(Math.PI);
                ctx.translate(-width, -height);

                ctx.drawImage(image, 0, 0);
                imageDate = canvas.toDataURL('Image/jpeg', 1);
                newImage.src = imageDate;
                break;

            //旋转270°
            case 8:
                console.log('旋转270°');
                canvas.height = width;
                canvas.width = height;
                ctx.rotate(-Math.PI / 2);
                ctx.translate(-height, 0);

                ctx.drawImage(image, 0, 0);
                imageDate = canvas.toDataURL('Image/jpeg', 1);
                newImage.src = imageDate;
                break;

            //undefined时不旋转
            case undefined:
                console.log('undefined  不旋转');
                newImage.src = image.src;
                break;
        }
    });
    return callback(newImage);
}