"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class SendEMail {}
_defineProperty(SendEMail, "handleSendMail", async (userEmail, message, subject) => {
  /**
   *  Username:	support@superpunters.com
      Password:	Use the email account’s password.
      Incoming Server:	server71.web-hosting.com
      IMAP Port: 993 POP3 Port: 995
      Outgoing Server:	server71.web-hosting.com
      SMTP Port: 465
      IMAP, POP3, and SMTP require authentication.
  * 
  */
  //  console.log(`EMAIL HOST::: , ${process.env.EMAIL_HOST}
  //      \n ${process.env.EMAIL_PORT} 
  //      \n ${process.env.EMAIL_USERNAME} 
  //      \n ${process.env.EMAIL_PASSWORD}`);
  // console.log(`EMAIL::: , ${userEmail} \n ${userName} \n ${otp}`);

  //  Creating a Transport
  const emailTransporter = _nodemailer.default.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const emailData = {
    from: process.env.EMAIL_SENDER,
    to: userEmail,
    subject: subject,
    html: emailBody(message)
  };

  //  Send the Mail now with the "emailTransporter" created.
  const emailResponse = await emailTransporter.sendMail(emailData);
  // console.log("EMAIL RESPONSE::: ", emailResponse);
  return await emailTransporter.sendMail(emailData);
});
const emailBody = message => {
  let body = `
        <!DOCTYPE html>
    <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width,initial-scale=1" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <style>
        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins' !important;
        }
        p,a,h1,h2,h3,h4,h5,h6{
            font-family: 'Poppins' !important;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0;
            overflow: hidden
        }

        .menu_block.desktop_hide .menu-links span {
            mso-hide: all
        }

        @media (max-width:620px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important
            }

            .icons-inner {
                text-align: center
            }

            .icons-inner td {
                margin: 0 auto
            }

            .row-content {
                width: 100% !important
            }

            .mobile_hide {
                display: none
            }

            .stack .column {
                width: 100%;
                display: block
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important
            }

            .reverse {
                display: table;
                width: 100%
            }

            .reverse .column.first {
                display: table-footer-group !important
            }

            .reverse .column.last {
                display: table-header-group !important
            }

            .row-4 td.column.first>table,
            .row-4 td.column.last>table {
                padding-left: 15px;
                padding-right: 15px
            }

            .row-4 td.column.first .border,
            .row-4 td.column.last .border {
                border-top: 0;
                border-right: 0;
                border-bottom: 0;
                border-left: 0
            }
        }
    </style>
</head>

<body style="background-color:transparent;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace:0;mso-table-rspace:0;background-color:transparent" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                        role="presentation"
                        style="mso-table-lspace:0;mso-table-rspace:0;background-color:#0E6D45 !important" width="50%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;background-position:top center;background-repeat:no-repeat;color:#000;background-color:#0E6D45 !important;width:600px"
                                        width="600">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-left:15px;padding-right:15px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="50%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="image_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:35px;padding-right:10px;padding-top:15px;width:100%">
                                                                <div align="center" class="alignment"
                                                                    style="line-height:10px"><img alt="Your Brand Logo"
                                                                        src="https://deeventures.com.ng/images/deeventures_logo1.png"
                                                                        style="display:block;height:auto;border:0;width:216px;max-width:100%;margin-left:70%;"
                                                                        title="Your Brand Logo" width="216" /></div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-left:15px;padding-right:15px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="50%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="empty_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-right:0;padding-bottom:15px;padding-left:0;padding-top:15px">
                                                                <div></div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="50%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:600px"
                                        width="600">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:15px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="100%">
                                                    <table border="0" cellpadding="15" cellspacing="0"
                                                        class="text_block block-1" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="font-family:sans-serif">
                                                                    <div class=""
                                                                        style="font-size:14px;mso-line-height-alt:16.8px;color:#000;line-height:1.2;font-family:Varela Round,Trebuchet MS,Helvetica,sans-serif">`;
  body += message;
  body += `		<br>
																	
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f2fbf8;" width="50%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-right: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:60px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 14px; mso-line-height-alt: 16.8px; color: #000000; line-height: 1.2; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:22px;"><strong>Crypto & Giftcards</strong>
                                                                                    <br /></span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;padding-bottom:20px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Most spent day"
                                                                            src="https://deeventures.com.ng/images/6.png"
                                                                            style="display: block; height: auto; border: 0; width: 75px; max-width: 100%;"
                                                                            title="Most spent day" width="75" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td class="column column-2"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-right: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="50%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="text_block block-3" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:25px;padding-left:25px;padding-right:25px;padding-top:120px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class=""
                                                                            style="font-size: 14px; mso-line-height-alt: 16.8px; color: #000000; line-height: 1.2; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif;">
                                                                            <p
                                                                                style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                                                <span style="font-size:22px;"><strong>Airtime and Bills </strong><br /></span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-4" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;padding-bottom:50px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img alt="Most spent month"
                                                                            src="https://deeventures.com.ng/images/4.png"
                                                                            style="display: block; height: auto; border: 0; width: 120px; max-width: 100%;"
                                                                            title="Most spent month" width="120" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f2fbf8;" width="50%">
                            <tbody>
                                <tr>
                                    <td>
                                        <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            class="row-content stack" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;"
                                            width="680">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 30px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                                        width="100%">
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="image_block block-1" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div align="center" class="alignment"
                                                                        style="line-height:10px"><img
                                                                            src="https://deeventures.com.ng/images/deeventures_logo.png"
                                                                            style="display: block; height: auto; border: 0; width: 120px; max-width: 100%;"
                                                                            width="120" /></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table border="0" cellpadding="0" cellspacing="0"
                                                            class="heading_block block-2" role="presentation"
                                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                            width="100%">
                                                            <tr>
                                                                <td class="pad"
                                                                    style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:20px;text-align:center;width:100%;">
                                                                    <h3
                                                                        style="margin: 0; color: #555555; direction: ltr; font-family: Cabin, Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                                        <span
                                                                            id="5671ad78-f881-4153-b4e1-51e3092415cd">@2022
                                                                        </span>Deeventures LTD. All Rights Reserved<br /></h3>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </td>
                </tr>
            </tbody>
        </table><!-- End -->
    </body>
    
    </html>`;
  return body;
};
var _default = exports.default = SendEMail;
//# sourceMappingURL=send_email.js.map