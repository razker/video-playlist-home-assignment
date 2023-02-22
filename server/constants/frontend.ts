const FRONTEND_DEV_URLS = ["http://localhost:3000", "http://localhost:3001"];

const FRONTEND_PROD_URLS = [
  "https://fdt-waiting-lists.up.railway.app",
  "https://waiting-lists-fdt.netlify.app",
];

export default process.env.NODE_ENV === "production"
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;
