var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fartoysjefgumo@gmail.com',
      pass: 'Jalla900'
    }
 });


 const videoMailOptions = {
    from: 'Fartøysjefen',
    to: 'arnemg@rydningen.org',
    subject: 'En video til deg',
    html: 'Dette er en video fra Løkkadagene 2019',
    attachments: [{
     filename: 'lokkadag.h264',
     path: '/home/arnemg/nodeJS/servo/public/video.h264'
    }]
 };


 const photoMailOptions = {
    from: 'Fartøysjefen',
    to: 'arnemg@rydningen.org',
    subject: 'Et bildet til deg',
    html: 'Dette er et bildet fra Løkkadagene 2019',
    attachments: [{
      filename: 'IntruderImage.jpg',
      path: '/home/arnemg/nodeJS/servo/public/photo.jpg'
     }]
  };

  module.exports.sendMailVideo = function () {
    transporter.sendMail(videoMailOptions, function (err, info) {
       if(err){
         console.log(err.toString());
       }
       else{
         console.log('Video email success..!!');
       }
    });
 }
  
 module.exports.sendMailPhoto = function (){
    transporter.sendMail(photoMailOptions, function (err, info) {
    if(err){
      console.log(err.toString())
    }
    else{
     console.log('Photo email success..!!');
    }
   });
 }