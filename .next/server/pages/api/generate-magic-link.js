"use strict";
(() => {
var exports = {};
exports.id = 832;
exports.ids = [832];
exports.modules = {

/***/ 885:
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ 190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(885);
/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);

// Supabase Client (same as other API files - works after you add env vars)
const supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
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
    try {
        // Fetch study to confirm it exists
        const { data: study, error } = await supabase.from("studies").select("*").eq("id", studyID).single();
        if (error || !study) {
            return res.status(404).json({
                error: "Study not found"
            });
        }
        // Build the magic link
        const magicLink = `${"http://localhost:3000"}/results/${studyID}`;
        // (Optional Future Step) — You could automatically email this link to the customer here.
        return res.status(200).json({
            success: true,
            magicLink
        });
    } catch (error) {
        console.error("Error generating magic link:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to generate magic link"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(190));
module.exports = __webpack_exports__;

})();