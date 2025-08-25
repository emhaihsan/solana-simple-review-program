import { FC } from "react";

interface FormProps {
  title: string;
  description: string;
  rating: number;
  location: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setRating: (value: number) => void;
  setLocation: (value: string) => void;
  handleSubmit: () => void;
}
const ReviewForm: FC<FormProps> = ({
  title,
  description,
  rating,
  location,
  setTitle,
  setDescription,
  setRating,
  setLocation,
  handleSubmit,
}) => {
  const formSubmit = (e: any) => {
    e.preventDefault();
    if (rating < 0 || rating > 10) {
      alert("Rating must be between 0 and 10.");
      return;
    }
    if (!title || !description || !location) {
      alert("Please fill title, description, and location.");
      return;
    }
    handleSubmit();
  };
  return (
    <form
      className="p-6 md:p-7 space-y-4 w-full max-w-md"
      onSubmit={(e) => formSubmit(e)}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Title
          </label>
          <input
            className="input-dark"
            id="title"
            type="text"
            placeholder="e.g. Sakura Ramen"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Description
          </label>
          <input
            className="input-dark"
            id="description"
            type="text"
            placeholder="What did you like? Signature dishes? Service?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Location
          </label>
          <input
            className="input-dark"
            id="location"
            type="text"
            placeholder="City, Country or neighborhood"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 text-sm font-medium">
            Rating
          </label>
          <input
            className="input-dark"
            id="rating"
            type="number"
            placeholder="0 - 10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            max={10}
            min={0}
          />
        </div>

        <div className="pt-2">
          <button className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 hover:from-purple-700 hover:via-blue-700 hover:to-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
