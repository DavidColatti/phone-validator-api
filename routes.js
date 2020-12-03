const phone = require("phone");
const cityZipByPhone = require("city-zip-by-phone");
const router = require("express").Router();

router.get("/", (_, res) => {
  res.status(200).json({ data: "Send A Post Request of a Phone Number" });
});

router.post("/", (req, res) => {
  const phoneNumber = req.body.phone_number;
  const initalFilter = phone(phoneNumber);

  if (initalFilter.length > 0) {
    const cleanedNumber = initalFilter[0].replace(/^\+1/g, "");
    const countryCode = initalFilter[1];

    const location = cityZipByPhone(cleanedNumber);

    res.json({
      phone_number: cleanedNumber,
      city: location.city,
      zip: location.zip,
      country_code: countryCode,
    });
  } else {
    res.json({ data: "Not a valid phone number" });
  }
});

module.exports = router;
