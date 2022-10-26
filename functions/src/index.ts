// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * We currently aren't using the functions.
 */
exports.submitQuestion = functions.https.onRequest(async (req, res) => {
  const request = req.query.text as string;
  console.debug(`Received request ${request}`);

  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  res.json({ Hallo: 'Wereld' });
});
