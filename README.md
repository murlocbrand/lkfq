lkfq
====

Login to LKF using a headless browser, with png proof in case of dispute.

deps
====

 - PhantomJS (http://phantomjs.org/)

use
===

 - Put your social security number into `LKFQ_USERID` and your password into
`LKFQ_PASSW`
 - Run this project as `phantomjs index.js`
 - Check that it worked by inspecting `proof.png` (located in `$(PWD)/proof.png`)
 - Add this to your crontab and never worry about your queue
 - Write some backup script for `proof.png` to be even more safe

env
===

windows: `set LKFQ_USERID=...` and `set LKFQ_PASSW=...`

*nix: `export LKFQ_USERID=...` and `export LKFQ_PASW=...`

license
=======

MIT