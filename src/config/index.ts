const BaseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:3000/"
  : "https://solarity-stage.vercel.app/";
export default BaseUrl;