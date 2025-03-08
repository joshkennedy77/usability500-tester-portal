"use strict";
(() => {
var exports = {};
exports.id = 586;
exports.ids = [586];
exports.modules = {

/***/ 885:
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ 466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "@supabase/supabase-js"
var supabase_js_ = __webpack_require__(885);
;// CONCATENATED MODULE: external "nodemailer"
const external_nodemailer_namespaceObject = require("nodemailer");
var external_nodemailer_default = /*#__PURE__*/__webpack_require__.n(external_nodemailer_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/mark-study-complete.ts


// Supabase Client
const supabase = (0,supabase_js_.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
// Email Transporter - You need to add these to your .env.local
const transporter = external_nodemailer_default().createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: Number(process.env.EMAIL_SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASS
    }
});
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    const { studyID } = req.body;
    if (!studyID) {
        return res.status(400).json({
            error: "Missing studyID"
        });
    }
    // 1️⃣ Update Study Status to Complete
    const { error: updateError } = await supabase.from("studies").update({
        status: "Complete"
    }).eq("id", studyID);
    if (updateError) {
        console.error("Error updating study:", updateError);
        return res.status(500).json({
            error: "Failed to update study"
        });
    }
    // 2️⃣ Fetch Study Details to Get Customer Email
    const { data: study, error: fetchError } = await supabase.from("studies").select("id, customerEmail, customerName").eq("id", studyID).single();
    if (fetchError || !study) {
        return res.status(404).json({
            error: "Study not found"
        });
    }
    // 3️⃣ Build the Magic Link
    const magicLink = `${"http://localhost:3000"}/results/${studyID}`;
    // 4️⃣ Send Email with Magic Link
    const emailOptions = {
        from: '"Usability500 Team" <support@usability500.com>',
        to: study.customerEmail,
        subject: "Your Usability Study Results are Ready! \uD83C\uDF89",
        html: `
            <p>Hi ${study.customerName},</p>
            <p>Your usability study is complete! You can view your results at the link below:</p>
            <p><a href="${magicLink}">${magicLink}</a></p>
            <p>Thank you for using Usability500!</p>
        `
    };
    try {
        await transporter.sendMail(emailOptions);
    } catch (emailError) {
        console.error("Failed to send email:", emailError);
        return res.status(500).json({
            error: "Failed to send email"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Study marked complete and email sent!"
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(466));
module.exports = __webpack_exports__;

})();