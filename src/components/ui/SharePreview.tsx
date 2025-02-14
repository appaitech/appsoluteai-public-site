export function SharePreview({ url, title, description, image }: SharePreviewProps) {
  return (
    <div className="p-4 border rounded-xl">
      <img src={image} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4 flex space-x-2">
        {/* Social share buttons */}
      </div>
    </div>
  );
} 