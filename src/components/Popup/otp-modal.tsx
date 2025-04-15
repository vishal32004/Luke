import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";
import { useState } from "react";

interface OtpModalProps {
  open: boolean;
  setOpen: (boolean: boolean) => void;
}

export const OtpModal = ({ open, setOpen }: OtpModalProps) => {
  const [error, setError] = useState("");
  const [passkey, setPasskey] = useState("");

  const closeModal = () => {
    setOpen(false);
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === "123456") {
      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="space-y-5 border-dark-500 outline-none">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Please Enter OTP
            <X className="cursor-pointer" onClick={() => closeModal()} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the OTP.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="w-full flex justify-between">
              {Array.from({ length: 6 }, (_, index) => (
                <InputOTPSlot
                  key={index}
                  className="text-36-bold justify-center flex border border-dark-500 rounded-lg size-16 gap-4"
                  index={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="text-red-700 text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn bg-first w-full"
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
