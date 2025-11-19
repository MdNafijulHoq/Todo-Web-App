"use client";

import { useState } from "react";
import CustomButtton from "../shared/CustomButton";
import PasswordChangeModal from "./PasswordChangeModal";

const PasswordSection = () => {
  const [openPassModal, setOpenPassModal] = useState<boolean>(false);
  return (
    <>
      <CustomButtton
        word="Change Password"
        onClick={() => setOpenPassModal(true)}
      />

      {/* Open Change Password Modal */}
      {openPassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <PasswordChangeModal onClose={() => setOpenPassModal(false)} />
        </div>
      )}
    </>
  );
};

export default PasswordSection;
