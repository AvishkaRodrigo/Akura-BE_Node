// // import nodemailer from 'nodemailer';

// const sendEmail = async (options) => {
//  console.log('reached here node mailer');
//   const transport = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     service: 'gmail',
//     // port: Number(process.env.SMTP_PORT),
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_USER, // generated ethereal user
//       pass: process.env.SMTP_PASSWORD // generated ethereal password
//     }
//   });

//   // console.log(options)
//   // Message object
//   const message = {
//     from: process.env.SMTP_USER,
//     to: options.to,
//     subject: options.subject,
//     html: options.text
//   };

//   // const info = await transport.sendMail(message);
//   // console.log(`Message sent successfully as ${info.messageId}`);
  
//   await transport.sendMail(message, (error, info)=> {
//     if (error) {
//       console.log(error);
//       return error
//     } else {
//       console.log('Email sent: ' + info.response);
//       return info.response
//     }
//   });

//   // return info.messageId
// };

// export default sendEmail;
