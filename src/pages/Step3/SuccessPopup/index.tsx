import Button from "@/components/Button";
import Popup from "@/components/Popup";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessPopup = ({ isOpen, onClose }: SuccessPopupProps) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-primary mb-2 text-xl font-bold">
          KYC Verification Complete 🎉
        </h2>
        <p className="mb-4 text-sm text-gray-700">
          Congratulations! Your identity has been successfully verified.
        </p>
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </div>
    </Popup>
  );
};

export default SuccessPopup;
