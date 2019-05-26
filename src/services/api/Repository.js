import http from './http';

export const FindRepository = repo => http.get(`repos/${repo}`);
