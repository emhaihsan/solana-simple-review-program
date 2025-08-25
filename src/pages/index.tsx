import { AppBar } from "@/components/AppBar";
import ReviewCard from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import { Review } from "@/models/Review";
import * as web3 from "@solana/web3.js";
import { fetchReviews } from "@/util/fetchReviews";
import { useWallet } from "@solana/wallet-adapter-react";
import ReviewForm from "@/components/Form";

//Replace with your own Program_id
const REVIEW_PROGRAM_ID = "EoicY6wXgDT4EBouFP16WqyboMwAkoj61AJexEnUP6uA";

export default function Home() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const { publicKey, sendTransaction } = useWallet();
  const [txid, setTxid] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        await fetchReviews(REVIEW_PROGRAM_ID, connection).then(setReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleSubmit = () => {
    const review = new Review(title, rating, description, location);
    handleTransactionSubmit(review);
  };

  const handleTransactionSubmit = async (review: Review) => {
    if (!publicKey) {
      alert("Please connect your wallet");
      return;
    }

    setIsLoading(true);
    const buffer = review.serialize();
    const transaction = new web3.Transaction();

    const [pda] = await web3.PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), Buffer.from(review.title)],
      new web3.PublicKey(REVIEW_PROGRAM_ID)
    );

    const instruction = new web3.TransactionInstruction({
      data: buffer,
      programId: new web3.PublicKey(REVIEW_PROGRAM_ID),
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
    });
    transaction.add(instruction);

    try {
      let txid = await sendTransaction(transaction, connection);
      // Wait for confirmation to ensure the program has written state
      await connection.confirmTransaction(txid, "confirmed");
      setTxid(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );

      // Clear form
      setTitle("");
      setRating(0);
      setDescription("");
      setLocation("");

      // Refresh reviews after successful submission
      const latest = await fetchReviews(REVIEW_PROGRAM_ID, connection);
      setReviews(latest);
    } catch (e) {
      console.log(JSON.stringify(e));
      alert(JSON.stringify(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header with Wallet */}
      <header className="relative z-50 p-4 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Solana Reviews
          </h1>
          <AppBar />
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Create New Review
              </h2>
              <ReviewForm
                title={title}
                description={description}
                rating={rating}
                location={location}
                setTitle={setTitle}
                setDescription={setDescription}
                setRating={setRating}
                setLocation={setLocation}
                handleSubmit={handleSubmit}
              />
            </div>

            {/* Transaction Status */}
            {txid && (
              <div className="glass-card p-4 border-green-500/30">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-green-400 font-medium">
                    Transaction Successful!
                  </p>
                </div>
                <a
                  href={txid.replace("Transaction submitted: ", "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline text-sm mt-2 block"
                >
                  View on Solana Explorer →
                </a>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="glass-card p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-purple-400">Processing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Reviews */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Community Reviews
            </h2>

            <div className="h-full overflow-y-auto space-y-4 pr-2">
              {reviews.length === 0 && !isLoading ? (
                <div className="glass-card p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-400">
                    Be the first to share your experience!
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review.title} review={review} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
