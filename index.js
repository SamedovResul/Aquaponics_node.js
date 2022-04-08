import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/send', (req, res) => {
  res.send("hello")
});



app.post('/send', (req, res) => {
  const output = req.body;
  console.log(output)

  // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASS  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });

  //   // setup email data with unicode symbols
    let mailOptions = {
        from: '"Aquaponics Contact" <semedovresul1997@gmail.com>', // sender address
        to:  'shahin@enteskedu.com', // list of receivers 'shahin@enteskedu.com'
        subject: 'email node.js', // Subject line
        text: 'Hello world?', // plain text body
        html: `
        <ul>
          <li>${output.name}</li>
          <li>${output.surname}</li>
          <li>${output.email}</li>
          <li>${output.phone}</li>
          <li>${output.message}</li>
        </ul>
        ` // html body
    };

  //   // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.status(404).json({error})
        res.status(200).json({output})
    });
    res.send(output)
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`server start at ${PORT}`))