import useWindowDimensions from "../../hooks/use-window-dimensions";
import DesktopError from "./DesktopError/desktop-error";
import MobileError from "./MobileError/mobile-error";

export default function Error(){
    const {width} = useWindowDimensions();

    return (
        <>
            {width <= 800 &&(
                <MobileError />
            )}

            {width > 800 &&(
                <DesktopError />
            )}
        </>         
    )
}