export default function Illustration() {
  return (
    <div className="w-[90vw] max-w-6xl mx-auto mt-[-30px] border border-transparent rounded-2xl shadow-md overflow-hidden ">
     <video
  className="w-full h-auto block"
  src="/218955_small.mp4" // Ensure this file is in your public folder
  autoPlay
  loop
  muted
  playsInline
  preload="auto" // Preload the video for faster start
>
  Your browser does not support the video tag.
</video>

    </div>
  );
}