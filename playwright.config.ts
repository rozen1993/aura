import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests',timeout:30000,workers:2,reporter:'list',use:{baseURL:'http://127.0.0.1:4321',browserName:'chromium',channel:'msedge',headless:true,trace:'retain-on-failure'},webServer:{command:'npm.cmd run dev -- --port 4321',url:'http://127.0.0.1:4321',reuseExistingServer:true}});
