import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },     // Ramp up to 50 users
    { duration: '3m', target: 100 },    // Increase to 100 users
    { duration: '3m', target: 150 },    // Increase to 150 users
    { duration: '3m', target: 200 },    // Increase to 200 users
    { duration: '5m', target: 200 },    // Stay at 200 users
    { duration: '2m', target: 0 },      // Ramp down to 0 users
  ],
};

export default function () {

  const res = http.get('https://subscriptionpro.co/', {
    timeout: '60s',
  });

  console.log(`Status Code: ${res.status}`);

  sleep(1);
}