import express from 'express';
import axios from 'axios';

const app = express();

const API_PORT = process.env.PORT || 3000;
const PSO_URL = 'https://www.psopk.com/en/fuels/fuel-prices';

app.get('/fuel-prices', async (req, res) => {
  try {
    const response = await axios.get(PSO_URL);
    // extract petrol price data from response
    const fuelPrices = extractFuelPrices(response.data);
    res.json({ fuelPrices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function extractFuelPrices(html) {
  // use a regular expression to extract petrol price data from the HTML
  const regex = /LDO \((\d+\.\d+)\)/;
  const match = html.match(regex);
  return match ? match[1] : null;
}

app.listen(API_PORT, () => {
  console.log(`API server started on port ${API_PORT}`);
});
