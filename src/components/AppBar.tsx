import { FC } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const AppBar: FC = () => {
  return (
    <div className="flex items-center justify-center z-50 relative">
      <div className="relative z-50">
        <WalletMultiButton className="!relative !z-50 !bg-gradient-to-r !from-purple-600 !via-blue-600 !to-emerald-600 hover:!from-purple-700 hover:!via-blue-700 hover:!to-emerald-700 !border-none !rounded-xl !px-6 !py-3 !text-white !font-semibold !transition-all !duration-300 hover:!scale-105 hover:!shadow-xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-xl blur opacity-30 -z-10"></div>
      </div>
    </div>
  );
};
