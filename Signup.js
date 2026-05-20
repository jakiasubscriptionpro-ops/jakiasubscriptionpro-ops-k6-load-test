import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.10'],
  },
};

export default function () {

  const randomId = Math.floor(Math.random() * 1000000);

  // exact payload
  const payload = JSON.stringify({
    name: 'Jakia Sultana',
    email: `jakia${randomId}@gmail.com`,
    password: 'password',
    user_type: 3,
    aff: '',
    ref: '',
    verify_code: ''
  });

  // headers
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  // API request
  const response = http.post(
    'https://app.backend.subscriptionpro.co/api/register',
    payload,
    params
  );

  // logs
  console.log('STATUS:', response.status);
  console.log('BODY:', response.body);

  // validation
  check(response, {
    'signup success': (r) =>
      r.status === 200 ||
      r.status === 201,
  });

  sleep(1);
}