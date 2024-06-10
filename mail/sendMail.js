import nodemailer from "nodemailer"
export async function sendEmail(userName,userEmail,userPhone,userMessage, reciver) {
  if (!userEmail) {
    userEmail='noureldin.20200396@gmail.com'
  }
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "noureldin.20200396@gmail.com",
          pass: "usiydjdwpzbfkjye",
        },
      });
      
        const info = await transporter.sendMail({
          from: `"${userName} phone: ${userPhone} <${userEmail}>" <${userEmail}>`, // sender address
          to: reciver, // list of receivers
          subject: `"Portfolio Contact Me"`, // Subject line
          html: `<b>${userEmail}</b> <br />
          <p>${userMessage}</p>
          `, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
}