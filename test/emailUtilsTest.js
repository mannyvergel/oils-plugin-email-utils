'use strict';

const path = require('path');

const oilsPath = path.join(process.cwd(), '../oils-js');
const Web = require(oilsPath);
const zconf = require('../zconf.js');

const assert = require("assert");

const conf = {
  baseDir: oilsPath,
  secretPassphrase: "fk12r9012kr9fakasfoiajsfijs9!!",
  plugins: {
  'oils-plugin-email-utils': {
      enabled: true,
      pluginPath: '/../oils-plugin-email-utils',


      defaultFrom: 'manny@pesobility.com',
      apiKey: zconf.apiKey,
      bodyTransform: function(bodyText) {
        return bodyText.replace(/\n/g, '<br/>')
      },
    }
  }
}

const web = new Web(conf);

describe('app', function() {
  this.timeout(40000);

  web.start();

  before(async function() {
    await web.sleep(2000);

  })

  it('should have web.emailUtils', async function() {
    assert(web.emailUtils, "web.emailUtils should exist");
  })

  it('should properly execute', async function() {
    
    await web.emailUtils.email({
      to: ['manny@mvergel.com', 'manuel_igop@yahoo.com'],
      subj: 'Mocha Test Email',
      body: `Hi Manny,

This is a test email.

Best regards,
Manny
`,
      conf: {
        
        dontEmail: true,  

      },
    })
  });

  after(async function() {
    process.exit();
  })
});