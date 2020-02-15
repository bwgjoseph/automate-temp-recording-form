const puppeteer = require('puppeteer');

function delay(time) {
   return new Promise(function(resolve) {
       setTimeout(resolve, time)
   });
}

const formElementId = {
  name: '5e322f670ec75e0011f27ead',
  id: '5e3ed9ed9eb20a0011660c62',
  pc: '5e3e70862cd5cc001106c718',
  type: '5e3b7d63ae17b00011e6a700',
  temp: '5e33ddeabca756001160729e',
};

const formPCs = [
  'Advance Systems',
  'Air Systems',
  'Building & Infra',
  'C3 Development',
  'CIO',
  'Corp Comms',
  'Corp Services',
  'Cybersecurity',
  'Digital Hub',
  'DSTA Academy',
  'Enterprise IT',
  'Human Resource',
  'InfoComm Infra',
  'Information',
  'Internal Audit',
  'Land Systems',
  'Masterplanning & Sys Architecting',
  'National Engineering',
  'National Security',
  'Naval Systems',
  'Procurement',
  'Systems Management',
  'Others',
];

(async () => {
  const [,, name, id, pc, type, temperature] = process.argv;
  // if (process.argv.length < 3) {
  //   console.error('Please input your full name, id, pc, type, and temperature');
  //   process.exit(1);
  // }

  if (isNaN(temperature)) {
    console.error('Invalid input');
    process.exit(1);
  }

  if (parseInt(temperature) <= 35 || parseInt(temperature) >= 42) {
    console.error('Please enter a decimal between 35 and 42 (inclusive)');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  });
  await page.goto('https://go.gov.sg/temperaturerecording', {
    waitUntil: 'networkidle0'
  });
  await page.waitFor(`input[name="${formElementId.name}"]`);

  // Input Fullname
  await page.type(
    `input[name="${formElementId.name}"]`,
    name || "name"
  );

  // Input ID
  await page.type(
    `input[name="${formElementId.id}"]`,
    id || "id"
  );

  // Input PC
  const ppc =
    formPCs.filter(ppc => ppc.startsWith(pc)).length === 1 ? pc : 'C3 Dev';
  await page.click(`[name="${formElementId.pc}"]`);
  await page.type(
    `[name="${formElementId.pc}"]`,
    ppc,
    { delay: 300 }
  );
  await page.keyboard.press('Enter');

  // Input Type
  await page.click(`[name="${formElementId.type}"]`);
  // Using keyboard method
  if (type === '2') {
    await page.keyboard.down('ArrowDown');
  }
  await page.keyboard.press('Enter');

  // Using search method
  // await page.type(
  //   `[name="${formElement.type}"]`,
  //   'In',
  //   { delay: 100 }
  // );
  // await page.keyboard.press('Enter');

  // Input Temperature
  await page.type(
    `input[name="${formElementId.temp}"]`,
    temperature || '3'
  );

  // Take screenshot before submission
  await page.screenshot({ path: `submission-${new Date().getTime()}.png`});

  // Auto submit if temperature is provided
  // Disable by default
  // if (temperature) {
  //   await Promise.all([page.waitForNavigation(), page.click('#form-submit')]);
  // }

  // await delay(3000);
  // await browser.close();
})();
