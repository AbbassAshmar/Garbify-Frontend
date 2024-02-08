import useWindowDimensions from "../../hooks/use-window-dimensions";
import DesktopError from "./DesktopError/desktop-error";
import MobileError from "./MobileError/mobile-error";

export default function Error({error}){
    const {width,height} = useWindowDimensions();

    if ((width <= 900 && height >=650) || width<=800){
        return <MobileError error={error}/>;
    }

    return <DesktopError error={error} />;
}