import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '2m', target: 50 },
    { duration: '1m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.01'],
  },
};

hello

const BASE_URL = 'https://app.backend.subscriptionpro.co';

export default function () {

  const payload = JSON.stringify({
    email: 'meceno2497@ellbit.com',
    password: 'password'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`${BASE_URL}/api/login`, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'login success': (r) => r.status === 200,
  });

  console.log(`Status Code: ${res.status}`);
  console.log(`Response: ${res.body}`);

  sleep(1);
}