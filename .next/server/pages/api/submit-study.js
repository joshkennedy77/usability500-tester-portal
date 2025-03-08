"use strict";
(() => {
var exports = {};
exports.id = 250;
exports.ids = [250];
exports.modules = {

/***/ 885:
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ 90:
/***/ ((module) => {

module.exports = import("stripe");;

/***/ }),

/***/ 400:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(885);
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([stripe__WEBPACK_IMPORTED_MODULE_1__]);
stripe__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


// Create Supabase Client
const supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
// Create Stripe Instance
const stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
});
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }
    try {
        const { fullName, email, phone, company, testLink, feedbackType, audience, studyGoals, specialInstructions, package: selectedPackage } = req.body;
        // Save study to Supabase (initially as Pending Payment)
        const { data, error } = await supabase.from("studies").insert([
            {
                full_name: fullName,
                email,
                phone,
                company,
                test_link: testLink,
                feedback_type: feedbackType,
                audience,
                study_goals: studyGoals,
                special_instructions: specialInstructions,
                package: selectedPackage,
                payment_status: "Pending"
            }
        ]).select().single();
        if (error) throw error;
        // Map the package to Stripe price (in cents)
        const priceMap = {
            "Single": 50000,
            "Bundle": 200000,
            "Hour": 10000
        };
        // Create Stripe Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: [
                "card"
            ],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Usability Study - ${selectedPackage} Package`
                        },
                        unit_amount: priceMap[selectedPackage]
                    },
                    quantity: 1
                }
            ],
            metadata: {
                study_id: data.id
            },
            mode: "payment",
            success_url: `${"http://localhost:3000"}/submit-success`,
            cancel_url: `${"http://localhost:3000"}/studybuilder?canceled=true`
        });
        // Update the study record with Stripe session ID
        await supabase.from("studies").update({
            stripe_session_id: checkoutSession.id
        }).eq("id", data.id);
        // Return the checkout URL for redirect
        return res.status(200).json({
            success: true,
            checkoutUrl: checkoutSession.url
        });
    } catch (error) {
        console.error("Error in submit-study.ts:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to process your study request"
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(400));
module.exports = __webpack_exports__;

})();