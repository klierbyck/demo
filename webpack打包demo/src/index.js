import "./index.css"
import "./index1.less"
import n from "./m"
function fun(){
    // console.log(a)
    var h1 = document.createElement("h1");
    h1.innerHTML = "Hello webpack!" + n.name;
    document.body.appendChild(h1);
}
fun();