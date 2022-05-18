const BaseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000/"
  : "https://solarity-frontend.vercel.app/";
export default BaseUrl;