const express = require('express');
const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.render('pages/index');
})

module.exports = router;


