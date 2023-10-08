import { SRGBColorSpace, LinearSRGBColorSpace } from 'three';

const configTexture = (ref) => {
    ref.current.map.colorSpace = SRGBColorSpace; // Set the map to sRGB
    ref.current.map.flipY = false;
    ref.current.map.needsUpdate = true;

    ref.current.normalMap.colorSpace = LinearSRGBColorSpace;
    ref.current.normalMap.flipY = false;
    ref.current.normalMap.needsUpdate = true;

    ref.current.roughnessMap.colorSpace = LinearSRGBColorSpace;
    ref.current.roughnessMap.flipY = false;
    ref.current.roughnessMap.needsUpdate = true;

    if (ref.current.metalnessMap) {
        ref.current.metalnessMap.colorSpace = LinearSRGBColorSpace;
        ref.current.metalnessMap.flipY = false;
        ref.current.metalnessMap.needsUpdate = true;
    }


    ref.current.needsUpdate = true;
}
export default configTexture;