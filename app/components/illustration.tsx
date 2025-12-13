export default function Illustration() {
  return (
    <div className="w-[90vw] max-w-6xl mx-auto mt-[-30px] border border-transparent rounded-2xl shadow-md overflow-hidden ">
      <video
        className="w-full h-auto block" // h-auto lets height adjust naturally
        src="218955_small.mp4" // Ensure this file is in your public folder
        autoPlay
        loop
        muted
        playsInline
       // Remove this if you don't want play/pause buttons
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}