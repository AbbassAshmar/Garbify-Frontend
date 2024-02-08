import useWindowDimensions from "../../hooks/use-window-dimensions";
import DesktopError from "./DesktopError/desktop-error";
import MobileError from "./MobileError/mobile-error";

export default function Error(){
    const {width,height} = useWindowDimensions();

    if ((width <= 900 && height >=650) || width<=800){
        return <MobileError />;
    }

    return <DesktopError />;
}