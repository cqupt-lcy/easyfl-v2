import { Navigate } from "react-router-dom";
import Content from "../components/Content";
const routes = [
  {path:'*',element:<div>404notfound</div>},
  {path:'/item/:id',element:<Content />},
]
export default routes