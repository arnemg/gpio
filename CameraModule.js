const PiCamera = require('pi-camera');


const myCameraPhoto = new PiCamera({
    mode: 'photo',
    output: `/home/arnemg/nodeJS/servo/public/photo.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
});

const myCameraVideo = new PiCamera({
   mode: 'video',
   output: `/home/arnemg/nodeJS/servo/public/video.h264`,
   width: 1920,
   height: 1080,
   timeout: 5000,
   nopreview: true,
});

var camerInUse = false;
module.exports.takePicture = function (callback){
    if (camerInUse == false) {
     camerInUse = true;
     myCameraPhoto.snap()
    .then((result) => {
        console.log('Your picture was captured')
        callback('success')
        camerInUse = false;
     })
     .catch((error) => {
      console.log(error.toString());
      callback(error.toString());
     });
   }
   else {
    console.log('camera in use..')
   }
 }

 module.exports.takeVideo = function (callback) {
    if(camerInUse == false){
      camerInUse = true;
      myCameraVideo.record()
     .then((result) => {
       console.log('recording completed...!!');
       callback('success')
       camerInUse = false;
    })
    .catch((error) => {
      console.log(error.toString());
    });
  }
  else{
     console.log('camera in use..')
   }
 }