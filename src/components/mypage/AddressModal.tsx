'use client';

import ReactDOM from 'react-dom';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { useEffect } from 'react';

interface Props {
  onComplete: (data: Address) => void;
  onClose: () => void;
}

export default function AddressModal({ onComplete, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[450px] rounded-md bg-white p-[16px]">
        <DaumPostcode
          onComplete={(data) => {
            onComplete(data);
            onClose();
          }}
        />
        <button
          className="bg-custom-blue-200 mt-[8px] w-full rounded py-[8px] text-white"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>,
    document.body,
  );
}
