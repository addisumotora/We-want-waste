import { useState } from "react";
import { Home, Truck, Info, Clock } from "lucide-react";

const PermitCheck = () => {
  const [selected, setSelected] = useState<"private" | "public" | null>(null);
  const [showModal, setShowModal] = useState(false); 
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    url?: string;
  } | null>(null); 
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFile({
          name: file.name,
          url: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const handleContinue = () => {
    if (!uploadedFile) {
      setError("Please upload an image before continuing.");
      return;
    }
    setError(null);
    setShowModal(false); 
  };

  const handleCancel = () => {
    setSelected(null); 
    setUploadedFile(null); 
    setShowModal(false); 
  };

  return (
    <div className="text-gray-900 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">Where will the skip be placed?</h1>
          <p className="mt-2 text-gray-500">This helps us determine if you need a permit for your skip</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => {
              setSelected("private");
              setShowModal(true); 
            }}
            className={`border rounded-2xl p-6 cursor-pointer text-left transition ${
              selected === "private"
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <Home className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Private Property</h2>
                <p className="text-sm text-gray-500">Driveway or private land</p>
                <p className="text-xs text-gray-400 mt-1">No permit required when placed on your private property</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelected("public");
              setShowModal(true); 
            }}
            className={`border rounded-2xl p-6 cursor-pointer text-left transition ${
              selected === "public"
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-400"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Truck className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Public Road</h2>
                <p className="text-sm text-gray-500">Council or public property</p>
                <p className="text-xs text-gray-400 mt-1">Permit required for placement on public roads</p>
              </div>
            </div>
          </button>
        </div>

        {selected === "public" && (
          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
              <Info className="text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800">Permit Required</h3>
                <p className="text-sm text-yellow-700">
                  A permit is required when placing a skip on a public road. We'll handle the permit application process for you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-100 border-l-4 border-blue-500 rounded-md">
              <Clock className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800">Processing Time</h3>
                <p className="text-sm text-blue-700">
                  The council requires 5 working days notice to process permit applications. Please plan your delivery date accordingly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {selected === "private"
                  ? "Private Property Placement"
                  : "Public Road Placement"}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <p className="mb-4 text-gray-600">
              {selected === "private"
                ? "Please upload a photo of the private property where the skip will be placed."
                : "A photo of the skip placement location is required for public road placement. This helps us ensure proper placement and identify any potential access issues."}
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              {error && (
                <p className="text-red-600 mb-2">{error}</p>
              )}
              {uploadedFile ? (
                <div>
                  <img
                    src={uploadedFile.url || ""}
                    alt="Uploaded Image"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                  <button
                    type="button"
                    onClick={() => setUploadedFile(null)}
                    className="text-blue-600 hover:text-blue-800 mt-2"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-10 h-10 text-blue-500 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-.8 1.6z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11l2 3m-3-3l-2-3m3 3V8m-11 11v-10"
                    ></path>
                  </svg>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    Upload Photo
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermitCheck;