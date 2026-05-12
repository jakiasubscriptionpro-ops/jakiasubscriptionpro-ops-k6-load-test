import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://subscriptionpro.co/', {
    timeout: '60s',
  });

  console.log(res.status);

  sleep(1);
}