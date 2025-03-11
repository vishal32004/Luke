import { spinnerGif } from "@/imports/images";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <img src={spinnerGif} alt="Loading Animation" />
      </div>
    </div>
  );
}
