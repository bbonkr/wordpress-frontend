export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-6">
      <div>
        <p className="text-2xl">Working on it.</p>
      </div>
      <div>
        <p className="text-2xl">Please wait a moment.</p>
      </div>
    </div>
  );
}
