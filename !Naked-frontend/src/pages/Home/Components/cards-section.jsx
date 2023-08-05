import BestSelling from "./best-selling";
import BlackHoody from "../../../assets/BlackHoody.jpg"
import White from "../../../assets/White.jpg"
import SkinColorHoody from "../../../assets/SkinColorHoody.jpg"
import RedHoody from "../../../assets/RedHoody.jpg"

export default function CardsSection(){
    return  (
        <div>
            <BestSelling title="Best Selling" img1={BlackHoody} img2={White} />
            <BestSelling reverse={true} title="New Arrivals" img1={RedHoody} img2={SkinColorHoody}/>
        </div>
    )

}