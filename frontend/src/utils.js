// import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
// import 'primereact/resources/primereact.min.css'; // Core CSS
// import 'primeicons/primeicons.css'; // Icons

import Cookies from "js-cookie";

export const returnToken = () => {
  const token = Cookies.get("token");
  console.log(token);
  return token;
};
